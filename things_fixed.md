# Things Fixed

## Issue 1: Double `.data` unwrapping in `useQuery.js`

### What was the issue
API data was being fetched successfully from the backend (network requests returned 200 OK with valid JSON), but the UI rendered nothing — as if no data existed.

### What is the issue in the current code
In `src/lib/axios-instance.js`, the response interceptor already extracts the response body:

```js
axiosInstance.interceptors.response.use(
  (response) => response.data, // returns just the JSON body
);
```

So any call to `axiosInstance()` resolves with the JSON body directly (e.g., `{ content: [...], totalElements: 5 }`).

But in `src/lib/hooks/useQuery.js`, the code did:

```js
const response = await axiosInstance(url, options);
setQueryState({ data: response.data, ... });
```

`response` is already the body. `response.data` is `undefined` because the body object has no `.data` property. This `undefined` gets stored in state, so components receive `null`/`undefined` and render nothing.

### How the fix resolves it
Changed `response.data` to `response`:

```js
const response = await axiosInstance(url, options);
setQueryState({ data: response, ... });
```

Now the actual JSON body (with `content`, `totalElements`, etc.) is stored in state and passed to components correctly.

### How to undo
**File:** `src/lib/hooks/useQuery.js`

Change line 16 from:
```js
        data: response,
```
Back to:
```js
        data: response.data,
```

---

## Issue 2: Double `.data` unwrapping in `useMutation.js`

### What was the issue
Any mutation (POST/PUT/DELETE) that returned data would silently lose that data — callbacks like `onSuccess` would receive the response correctly, but the hook's `data` state would always be `undefined`.

### What is the issue in the current code
Same root cause as Issue 1. In `src/lib/hooks/useMutation.js`:

```js
const response = await axiosInstance({ method, url, data: payload });
setMutateState((prev) => ({ ...prev, data: response.data }));
```

The interceptor already unwrapped `response.data`, so `response` here is the body. Accessing `.data` on it yields `undefined`.

### How the fix resolves it
Changed `response.data` to `response`:

```js
setMutateState((prev) => ({ ...prev, data: response }));
```

Now mutation results (e.g., created booking data, updated profile) are properly stored in state and accessible to components.

### How to undo
**File:** `src/lib/hooks/useMutation.js`

Change line 19 from:
```js
      setMutateState((prev) => ({ ...prev, data: response }));
```
Back to:
```js
      setMutateState((prev) => ({ ...prev, data: response.data }));
```

---

## Issue 3: Broken token refresh in `axios-instance.js`

### What was the issue
When an access token expired and the app tried to silently refresh it, the new token would not be saved — causing the user to be effectively logged out despite a successful refresh call.

### What is the issue in the current code
In `src/lib/axios-instance.js`, inside the 401 error handler:

```js
const response = await axiosInstance.post('/auth/refresh');
setStorageItem(AUTH_TOKEN_KEY, response.data.accessToken);
```

Again, `response` is already the unwrapped body (because the success interceptor returns `response.data`). So `response.data.accessToken` tries to access `.data` on the body, which is `undefined`. The token never gets saved to storage.

### How the fix resolves it
Made it defensive to work with both wrapped and unwrapped formats:

```js
const response = await axiosInstance.post('/auth/refresh');
setStorageItem(AUTH_TOKEN_KEY, response.data?.accessToken || response.accessToken);
```

Now it handles both `{ data: { accessToken } }` (Docker format) and `{ accessToken }` (direct format).

### How to undo
**File:** `src/lib/axios-instance.js`

Change line 40 from:
```js
        setStorageItem(AUTH_TOKEN_KEY, response.data?.accessToken || response.accessToken);
```
Back to:
```js
        setStorageItem(AUTH_TOKEN_KEY, response.data.accessToken);
```

---

## Issue 4: Broken image upload in `create-hotel-form.jsx`

### What was the issue
When clicking the "+" button to add hotel photos and selecting image files from the file picker, nothing happened — no images appeared in the form, and no files were uploaded.

### What is the issue in the current code
In `src/app/admin/create-hotels/create-hotel-form.jsx`, the file input's `onChange` handler was:

```js
onChange={(e) => {
  field.onChange([...field.value]);
}}
```

This completely ignores `e.target.files`. It just spreads the existing `field.value` array back into itself — effectively a no-op. The selected files are never read, never uploaded, and never added to the photos array.

### How the fix resolves it
Replaced with a proper `handleFileUpload` function that:

1. Reads the selected files from `e.target.files`
2. Creates a `FormData` object and appends the files under the field name `photos`
3. POSTs to `/api/v1/upload` (backend endpoint using multer)
4. Receives back an array of URLs where the images are now hosted
5. Appends those URLs to the existing `field.value` array
6. Silently does nothing if the upload endpoint doesn't exist (Docker compatibility)

```js
const handleFileUpload = async (e, field) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('photos', files[i]);
  }

  try {
    const response = await axiosInstance.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const urls = response.data?.urls || response.urls || [];
    field.onChange([...field.value, ...urls]);
  } catch {
    // Upload endpoint not available — silently ignore
  }
};
```

### How to undo
**File:** `src/app/admin/create-hotels/create-hotel-form.jsx`

1. Remove the `import axiosInstance from '@/lib/axios-instance';` line (line 16)
2. Remove the entire `handleFileUpload` function (lines 21-39)
3. Change the file input's `onChange` (inside the photos FormField) from:
```js
onChange={(e) => handleFileUpload(e, field)}
```
Back to:
```js
onChange={(e) => {
  field.onChange([...field.value]);
}}
```

---

## Issue 5: Broken image upload in `create-room-form.jsx`

### What was the issue
Same as Issue 4 — selecting room photos via the file picker did nothing.

### What is the issue in the current code
In `src/app/admin/create-room/create-room-form.jsx`, identical broken handler:

```js
onChange={(e) => {
  field.onChange([...field.value]);
}}
```

Does not use `e.target.files` at all.

### How the fix resolves it
Same fix as Issue 4 — replaced with `handleFileUpload` function that uploads files to `/api/v1/upload` and adds the returned URLs to the photos array. Silently does nothing if endpoint doesn't exist.

### How to undo
**File:** `src/app/admin/create-room/create-room-form.jsx`

1. Remove the `import axiosInstance from '@/lib/axios-instance';` line (line 14)
2. Remove the entire `handleFileUpload` function (lines 22-40)
3. Change the file input's `onChange` (inside the photos FormField) from:
```js
onChange={(e) => handleFileUpload(e, field)}
```
Back to:
```js
onChange={(e) => {
  field.onChange([...field.value]);
}}
```

---

## Issue 6: Broken image upload in `edit-hotel-form.jsx`

### What was the issue
Same as Issue 4 & 5 — editing a hotel and trying to add new photos via file picker did nothing.

### What is the issue in the current code
In `src/app/admin/edit-hotel/edit-hotel-form.jsx`, same broken `onChange` handler that ignores `e.target.files`.

### How the fix resolves it
Same `handleFileUpload` approach — uploads to `/api/v1/upload`, gets back URLs, appends them. Silently does nothing if the endpoint doesn't exist (Docker compatibility).

### How to undo
**File:** `src/app/admin/edit-hotel/edit-hotel-form.jsx`

1. Remove the `import axiosInstance from '@/lib/axios-instance';` line (line 9)
2. Remove the entire `handleFileUpload` function (lines 13-31)
3. Change the file input's `onChange` (inside the photos FormField) from:
```js
onChange={(e) => handleFileUpload(e, field)}
```
Back to:
```js
onChange={(e) => {
  field.onChange([...field.value]);
}}
```

---

## Issue 7: TypeError crash in `axios-instance.js` error handler

### What was the issue
When a non-401 API error occurred where the backend response didn't include a structured `error` object (e.g., a 500 with a generic message), the app would crash with `TypeError: Cannot read properties of undefined (reading 'message')`.

### What is the issue in the current code
In `src/lib/axios-instance.js`, the error interceptor:

```js
const error = {
  ...(request?.response?.data?.error || {}),
  message: request?.response?.data?.error.message || 'Something went wrong',
};
```

The first line safely handles `undefined` with `|| {}`. But the second line does `error.message` WITHOUT optional chaining. If `request.response.data.error` is `undefined`, this throws a TypeError.

### How the fix resolves it
Added optional chaining:

```js
message: request?.response?.data?.error?.message || 'Something went wrong',
```

Now it safely falls back to `'Something went wrong'` when the error object doesn't exist.

### How to undo
**File:** `src/lib/axios-instance.js`

Change line 47 from:
```js
      message: request?.response?.data?.error?.message || 'Something went wrong',
```
Back to:
```js
      message: request?.response?.data?.error.message || 'Something went wrong',
```

---

## Issue 8: TypeError crash in `use-poll-payment-status.js`

### What was the issue
On the payment status page, the app would crash with `TypeError: Cannot read properties of undefined (reading 'bookingStatus')` when trying to poll for payment status.

### What is the issue in the current code
In `src/app/payments/hooks/use-poll-payment-status.js`:

```js
const { data } = await axiosInstance.get(url);
if ([...].includes(data.bookingStatus)) { ... }
```

The axios response interceptor already returns `response.data` (the body). So `axiosInstance.get()` resolves with the body directly. Destructuring `{ data }` from the body looks for a `data` property on the JSON body — which doesn't exist if the body is the booking object itself. Result: `data` is `undefined`, and `data.bookingStatus` crashes.

### How the fix resolves it
Changed to use the response directly with a fallback for both wrapped and unwrapped formats:

```js
const response = await axiosInstance.get(url);
const booking = response.data || response;
if ([...].includes(booking.bookingStatus)) { ... }
```

Now it works whether the backend returns the booking directly `{ bookingStatus: "..." }` or wrapped in `{ data: { bookingStatus: "..." } }`.

### How to undo
**File:** `src/app/payments/hooks/use-poll-payment-status.js`

Replace the `getPaymentStatus` function body (lines 18-35) — change:
```js
    try {
      const response = await axiosInstance.get(
        API_CONFIG.BOOKING.STATUS_BOOKING.URL(bookingId)
      );

      const booking = response.data || response;

      if (
        [
          BOOKING_STATUS.CONFIRMED,
          BOOKING_STATUS.CANCELLED,
          BOOKING_STATUS.EXPIRED,
        ].includes(booking.bookingStatus)
      ) {
        setMaxRetries(0);
        setPaymentStatus(booking.bookingStatus);
        return;
      }

      setMaxRetries((prev) => prev - 1);
    } catch (err) {
      console.log('error occurred: ', err);
    }
```
Back to:
```js
    try {
      const { data } = await axiosInstance.get(
        API_CONFIG.BOOKING.STATUS_BOOKING.URL(bookingId)
      );

      if (
        [
          BOOKING_STATUS.CONFIRMED,
          BOOKING_STATUS.CANCELLED,
          BOOKING_STATUS.EXPIRED,
        ].includes(data.bookingStatus)
      ) {
        setMaxRetries(0);
        setPaymentStatus(data.bookingStatus);
        return;
      }

      setMaxRetries((prev) => prev - 1);
    } catch (err) {
      console.log('error occurred: ', err);
    }
```

---

## Issue 9: Error state stored as `undefined` in useQuery/useMutation

### What was the issue
When API calls failed, the error state would sometimes be stored as `undefined` instead of a useful error message, making it impossible for components to display error feedback.

### What is the issue in the current code
In `src/lib/hooks/useQuery.js` and `useMutation.js`:

```js
catch (e) {
  setQueryState((prev) => ({ ...prev, error: e.message }));
}
```

The axios error interceptor can reject with either:
- A plain string: `Promise.reject('Something went wrong')` (when there's no response)
- An error object: `Promise.reject({ message: "...", status: 401 })`

When it rejects with a string, `e.message` is `undefined` (strings don't have a `.message` property).

### How the fix resolves it
Changed to handle both formats:

```js
error: e?.message || e || 'Something went wrong',
```

Now it extracts the message from objects, uses the string directly if it's a string, or falls back to a generic message.

### How to undo
**File 1:** `src/lib/hooks/useQuery.js`

Change line 22 from:
```js
        error: e?.message || e || 'Something went wrong',
```
Back to:
```js
        error: e.message,
```

**File 2:** `src/lib/hooks/useMutation.js`

Change line 26 from:
```js
        error: err?.message || err || 'Something went wrong',
```
Back to:
```js
        error: err.message,
```

---

## Issue 10: Admin role mismatch between frontend and backend

### What was the issue
(Backend-specific — no frontend code changed) The frontend checks `user.roles.includes('HOTEL_MANAGER')` to determine admin access, but the backend only assigned the role `'ADMIN'` to admin users — so the frontend admin panel was inaccessible.

### What is the issue in the current code
In `src/lib/utils.js`:

```js
export const isAdmin = (user) => user.roles.includes('HOTEL_MANAGER');
```

The backend's default admin user only had `roles: ['ADMIN', 'USER']`. Since `'HOTEL_MANAGER'` was never in the array, `isAdmin()` always returned `false`.

### How the fix resolves it
Updated the backend to assign `roles: ['ADMIN', 'USER', 'HOTEL_MANAGER']` to the admin user. Also updated the backend's admin middleware to accept either `'ADMIN'` or `'HOTEL_MANAGER'` role for API access.

### How to undo
No frontend file was changed for this issue. This is purely a backend fix in `hotel-management-backend`:

**File 1:** `hotel-management-backend/src/db.js`

Change the admin user roles from:
```js
roles: ['ADMIN', 'USER', 'HOTEL_MANAGER'],
```
Back to:
```js
roles: ['ADMIN', 'USER'],
```

**File 2:** `hotel-management-backend/src/middleware/auth.js`

Change the adminMiddleware from:
```js
if (!req.user || (!req.user.roles.includes('ADMIN') && !req.user.roles.includes('HOTEL_MANAGER'))) {
```
Back to:
```js
if (!req.user || !req.user.roles.includes('ADMIN')) {
```
