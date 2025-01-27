import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function LanguageSelect() {
  return (
    <Select className="rounded-md">
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <div className="flex flex-row items-center">
            <div className="mr-2">A</div>
            <div>English</div>
          </div>
        </SelectItem>
        <SelectItem value="hi">
          <div className="flex flex-row items-center">
            <div className="mr-2">अ</div>
            <div>Hindi</div>
          </div>
        </SelectItem>
        <SelectItem value="pu">
          <div className="flex flex-row items-center">
            <div className="mr-2">ਕੇ</div>
            <div>Punjabi</div>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default LanguageSelect;
