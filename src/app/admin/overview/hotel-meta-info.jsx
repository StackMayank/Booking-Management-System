import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { ERROR_FALLBACK } from '@/config/app.config';
import { PATHS } from '@/config/path.config';
import useMutation from '@/lib/hooks/useMutation';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';


const DeleteHotelConfirmationDialog = ({ openDialog, setOpenDialog }) => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const { mutate, pending } = useMutation(`/admin/hotels/${hotelId}`, 'DELETE');
  const deleteHotelHandler = React.useCallback(() => {
    mutate(null, {
      onSuccess: () => {
        setOpenDialog(false);
        navigate(PATHS.ADMIN.LIST_HOTELS);
      },
      onError: (error) => {
        toast(error.message || ERROR_FALLBACK.TITLE, {
          type: 'error',
        });
      },
    });
  }, []);

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Hotel Hotel</AlertDialogTitle>
          <AlertDialogDescription className="leading-relaxed">
            Are you sure you want to delete this hotel? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={deleteHotelHandler}
            disabled={pending}
          >
            Yes, Delete My Hotel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const HotelSettings = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const openDeleteConfirmationDialog = React.useCallback(() => {
    setOpenDialog(true);
    setDropdownOpen(false);
  }, [setDropdownOpen, setOpenDialog]);
  return (
    <React.Fragment>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="w-8 h-8" variant="ghost">
            <Icon icon="more" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigate(`/admin/hotels/${hotelId}/edit`)}
          >
            Edit Hotel Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={openDeleteConfirmationDialog}
            className="text-destructive focus:text-destructive"
          >
            Delete Hotel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteHotelConfirmationDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </React.Fragment>
  );
};

const HotelMetaInfo = ({ name, address, photo, active }) => {
  return (
    <article className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 md:p-4 border rounded-md gap-4">
      <div className="flex gap-3 md:gap-4 w-full sm:flex-1 min-w-0">
        <img
          src={photo}
          alt={name}
          width={150}
          height={100}
          className="rounded-md w-24 md:w-[150px] h-20 md:h-[100px] object-cover flex-shrink-0"
        />
        <div className="space-y-2 md:space-y-3 flex-1 min-w-0">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-base md:text-xl font-semibold leading-none line-clamp-2">{name}</h2>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{address}</p>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <HotelSettings />
      </div>
    </article>
  );
};

export default HotelMetaInfo