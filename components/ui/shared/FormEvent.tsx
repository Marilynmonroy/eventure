"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaDollarSign, FaLink, FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { formEventSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { FileUpload } from "./FileUpload";
import { Checkbox } from "../checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import CreateEvent from "@/app/(root)/eventos/crear/page";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";

type FormEventProps = {
  userId: string;
  event?: IEvent;
  eventId?: string;
  type: "Crear" | "Actualizar";
};

const FormEvent = ({ userId, type, event, eventId }: FormEventProps) => {
  //hooks
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    event && type === "Actualizar"
      ? {
          ...event,
          startDataTime: new Date(event.startDateTime),
          endDataTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof formEventSchema>>({
    resolver: zodResolver(formEventSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof formEventSchema>) {
    let uploadImage = values.imageUrl;

    if (files.length > 0) {
      const uploadImages = await startUpload(files);
      if (!uploadImages) {
        return;
      }

      uploadImage = uploadImages[0].url;
    }

    if (type === "Crear") {
      try {
        const newEvent = await createEvent({
          event: {
            ...values,
            imageUrl: uploadImage,
          },
          userId,
          path: "/perfil",
        });

        if (newEvent) {
          form.reset();
          router.push(`/eventos/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Actualizar") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: {
            ...values,
            imageUrl: uploadImage,
            _id: eventId,
          },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">Titulo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Titulo del evento"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">Descripción</FormLabel>
                  <FormControl className="h-72">
                    <Textarea
                      placeholder="Descripción"
                      {...field}
                      className="textarea rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">Imagen</FormLabel>
                  <FormControl className="h-72">
                    <FileUpload
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">Ubicación</FormLabel>
                  <FormControl className="h-72">
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-md bg-gray-50 px-4 py-2">
                      <FaLocationDot className="text-gray-500" />
                      <Input
                        placeholder="Ubicación"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="startDataTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">Hora de inicio</FormLabel>
                  <FormControl className="h-72">
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-md bg-grey-50 px-4 py-2 text">
                      <FaCalendar className="text-gray-500" />
                      <p className="ml-3 whitespace-nowrap text-grey-500 pr-4">
                        Hora de inicio
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Dia:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="text-gray-600"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDataTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">Hora de fin</FormLabel>
                  <FormControl className="h-72">
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-md bg-grey-50 px-4 py-2 text">
                      <FaCalendar className="text-gray-500" />
                      <p className="ml-3 whitespace-nowrap text-grey-500 pr-4">
                        Hora de fin
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Dia:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="text-gray-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">Precio</FormLabel>
                  <FormControl className="h-72">
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-md bg-grey-50 px-4 py-2 text">
                      <FaDollarSign className="text-gray-500" />
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        disabled={form.getValues("isFree")}
                        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center">
                                <label
                                  htmlFor="isFree"
                                  className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Entrada gratis
                                </label>
                                <Checkbox
                                  onCheckedChange={field.onChange}
                                  checked={field.value}
                                  id="isFree"
                                  className="mr-2 h-5 w-5 border-2 border-primary-500"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">URL</FormLabel>
                  <FormControl className="h-72">
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-md bg-gray-50 px-4 py-2">
                      <FaLink className="text-gray-500" />
                      <Input
                        placeholder="URL"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="md:button w-72"
            >
              {form.formState.isSubmitting ? "Creando..." : `${type} evento `}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default FormEvent;
