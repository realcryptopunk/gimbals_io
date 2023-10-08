import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {Menu} from "lucide-react";


interface Item {
  key: string;
  label: string;
}

export default function Filterbutton() {
  const items: Item[] = [
    {
      key: "new",
      label: "New and Noteworthy",
    },
    {
      key: "copy",
      label: "Popular",
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
        startContent={<Menu/>}
          variant="flat"  
        >
          Filter
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        {items.map((item: Item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            className={item.key === "delete" ? "text-danger" : ""}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}