"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import emojiList from "@/public/emojibygroup.json";

interface IProps {
  children: JSX.Element;
}

interface IEmoji {
  emoji: string;
  skin_tone_support: boolean;
  name: string;
  slug: string;
  unicode_version: string;
  emoji_version: string;
}

export default function EmojiPicker({ children }: IProps) {
  const [emojiSearch, setEmojiSearch] = useState<IEmoji | undefined>(undefined);
  const [iconSearch, setIconSearch] = useState<any | undefined>(undefined);
  const [customUpload, setCustomUpload] = useState<File | undefined>(undefined);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearAllState();
    const file = event.target.files?.[0];
    if (file) {
      setCustomUpload(file);
    }
  };

  function clearAllState() {
    setCustomUpload(undefined);
    setEmojiSearch(undefined);
    setIconSearch(undefined);
  }

  return (
    <div className="p-2  border-[2px] border-black flex flex-row gap-2">
      <div className="flex items-center justify-center">
        {emojiSearch && (
          <span className="emoji" role="img" aria-label={emojiSearch.name}>
            {emojiSearch.emoji}
          </span>
        )}
        {customUpload && (
          <Image
            src={URL.createObjectURL(customUpload)}
            alt="emoji"
            width={30}
            height={30}
            className="object-cover"
          />
        )}
      </div>
      {children}
      <Popover>
        <PopoverTrigger>
          <Image src="edit.svg" alt="edit" height={20} width={20} />
        </PopoverTrigger>
        <PopoverContent className="w-[350px] h-[300px] overflow-hidden">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full justify-evenly">
              <TabsTrigger value="emojis">Emojis</TabsTrigger>
              <TabsTrigger value="icons">Icons</TabsTrigger>
              <TabsTrigger value="custom">Custom Emoji</TabsTrigger>
            </TabsList>
            <TabsContent
              value="emojis"
              className="flex flex-col gap-2 overflow-hidden"
            >
              <Input placeholder="Search Emojis" />
              <ScrollArea className="h-[175px] w-full">
                <div className="flex flex-col gap-2">
                  {emojiList.map((category, index) => (
                    <div key={index}>
                      <p className="text-base mb-1">{category.name}</p>
                      <div className="flex flex-row flex-wrap gap-3">
                        {category.emojis.map((emoji, emojiIndex) => (
                          <div
                            key={emojiIndex}
                            className="cursor-pointer"
                            onClick={() => {
                              clearAllState();
                              setEmojiSearch(emoji);
                            }}
                          >
                            <span
                              className="emoji"
                              role="img"
                              aria-label={emoji.name}
                            >
                              {emoji.emoji}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent
              value="custom"
              className="overflow-hidden flex flex-col gap-4"
            >
              <Input
                type="file"
                onChange={handleFileChange}
                className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {customUpload && (
                <div className="w-full h-full">
                  <Image
                    src={URL.createObjectURL(customUpload)}
                    alt="emoji"
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                  <p>{customUpload.name}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}
