"use client";
import { DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// import { useState } from "react";

const ItemRadio = ({ value }: { value: string }) => {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button>Open</button>
        </DialogTrigger>

        <DialogContent className="w-[400px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-[20px] capitalize mb-3">
              {value}
            </DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1" className=" text-[16px]">
                Rename
              </Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-fite p-2 m-auto">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ItemRadio;
