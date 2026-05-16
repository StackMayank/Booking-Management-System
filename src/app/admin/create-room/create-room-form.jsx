import { Button, ButtonWithIcon } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TokenInput from '@/components/ui/token-input';
import useCreateRoomForm from './use-create-room-form';
import Icon from '@/components/ui/icon';
import HotelImage from '@/components/hotel-image';
import axiosInstance from '@/lib/axios-instance';


const CreateRoomForm = () => {
  const { form, createRoomHandler, pending } = useCreateRoomForm();

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
      // Upload endpoint not available — silently ignore (matches original behavior)
    }

    e.target.value = '';
  };

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createRoomHandler)}
          className="space-y-4 md:space-y-6 max-w-[568px]"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Room Type</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="basePrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Base Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D+/g, ''))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Photos</FormLabel>
                <div className="flex flex-wrap gap-6 p-4 border rounded-md">
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      ref={field.ref}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, field)}
                    />
                  </FormControl>
                  {field.value?.map((photo) => (
                    <HotelImage key={photo} photo={photo} />
                  ))}
                  <FormLabel className="flex items-center justify-center w-24 h-24 border-2 border-dashed rounded-md cursor-pointer group hover:bg-secondary ">
                    <Icon
                      icon="addImage"
                      size="28"
                      className="text-muted-foreground group-hover:text-primary"
                      strokeWidth={1.5}
                    />
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Amenities</FormLabel>
                <FormControl>
                  <TokenInput {...field} placeholder="Type amenities here..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalCount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Total Room Count</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D+/g, ''))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Total Capacity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D+/g, ''))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonWithIcon
            icon="save"
            className="px-8 h-11"
            disabled={pending}
            isLoading={pending}
          >
            Create New Room
          </ButtonWithIcon>
        </form>
      </Form>
    </section>
  );
};

export default CreateRoomForm;
