"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteEvent } from "@/lib/actions/event.actions";
import { MdDelete } from "react-icons/md";

export const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <MdDelete className="text-rose-500" />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Se perderan todos los datos del evento{" "}
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            Será eliminado permanentemente{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteEvent({ eventId, path: pathname });
              })
            }
          >
            {isPending ? "Eliminando..." : "Eliminado"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
