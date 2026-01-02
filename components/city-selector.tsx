"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, MapPin } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// 添加更多中国城市
const locations = [
  // // 直辖市
  // { value: "beijing", label: "北京市" },
  // { value: "shanghai", label: "上海市" },
  // { value: "tianjin", label: "天津市" },
  // { value: "chongqing", label: "重庆市" },

  // 四川省
  { value: "chengdu", label: "成都市" },
  { value: "zigong", label: "自贡市" },
  { value: "luzhou", label: "泸州市" },
  { value: "deyang", label: "德阳" },
  { value: "mianyang", label: "绵阳" },
  { value: "guangyuan", label: "广元市" },
  { value: "suining", label: "遂宁市" },
  { value: "neijiang", label: "内江" },
  { value: "leshan", label: "乐山市" },
  { value: "nanchong", label: "南充市" },
  { value: "yibin", label: "宜宾市" },
  { value: "guanggan", label: "广安市" },
  { value: "dazhou", label: "达州市" },
  { value: "bazhong", label: "巴中市" },
  { value: "yaan", label: "雅安市" },
  { value: "ziyang", label: "资阳市" },
  { value: "aba", label: "阿坝市" },
  { value: "ganzizhou", label: "甘孜州市" },

  // 其他省会城市
  { value: "shenzhen", label: "深圳市" },
  { value: "nanjing", label: "南京市" },
  { value: "wuhan", label: "武汉市" },
  { value: "chengdu", label: "成都市" },
  { value: "xian", label: "西安市" },
  { value: "guangzhou", label: "广州市" },
  { value: "hangzhou", label: "杭州市" },
  { value: "jinan", label: "济南市" },
  { value: "changsha", label: "长沙市" },
  { value: "harbin", label: "哈尔滨市" },
  { value: "shenyang", label: "沈阳市" },
]

export function CitySelector() {
  const [open, setOpen] = React.useState(false)
  const [selectedLocation, setSelectedLocation] = React.useState(
    locations.find((loc) => loc.value === "leshan") || locations[0],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-auto justify-between">
          <MapPin className="mr-2 h-4 w-4 shrink-0" />
          <span>{selectedLocation.label}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="搜索城市..." />
          <CommandEmpty>未找到城市</CommandEmpty>
          <CommandList>
            {/* <CommandGroup heading="直辖市">
              {locations.slice(0, 4).map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={() => {
                    setSelectedLocation(location)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocation.value === location.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup> */}
            <CommandGroup heading="四川省">
              {locations.slice(0, 18).map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={() => {
                    setSelectedLocation(location)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocation.value === location.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="其他省会城市">
              {locations.slice(22).map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={() => {
                    setSelectedLocation(location)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocation.value === location.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
