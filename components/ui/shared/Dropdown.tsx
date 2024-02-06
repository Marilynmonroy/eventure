import React, { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import Category, { ICategory } from "@/lib/database/models/category.model";
import { Input } from "../input";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";

type Dropdownprops = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: Dropdownprops) => {
  //hooks
  const [categorias, setCategorias] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const getCategorias = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategorias(categoryList as ICategory[]);
    };

    getCategorias();
  }, []);
  //functions

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim(),
    }).then((Category) => {
      setCategorias((prevState) => [...prevState, Category]);
    });
  };

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Categoria" className="text-gray-500" />
      </SelectTrigger>
      <SelectContent>
        {categorias.length > 0 &&
          categorias.map((categoria) => (
            <SelectItem
              key={categoria._id}
              value={categoria._id}
              className="select-item p-regular-14"
            >
              {categoria.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger
            className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500
          "
          >
            Añadir una categoria
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Nueva categoria</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Nombre de la categoria"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Añadir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
