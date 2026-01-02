"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, MapPin } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// 添加更多中国城市
const locations = [
  // 直辖市
  { value: "beijing", label: "北京市" },
  { value: "shanghai", label: "上海市" },
  { value: "tianjin", label: "天津市" },
  { value: "chongqing", label: "重庆市" },

  // 河南省
  { value: "zhengzhou", label: "郑州市" },
  { value: "zhengdong", label: "郑东新区" },
  { value: "erqi", label: "二七区" },
  { value: "jinshui", label: "金水区" },
  { value: "zhongyuan", label: "中原区" },
  { value: "huiji", label: "惠济区" },
  { value: "shangjie", label: "上街区" },
  { value: "guancheng", label: "管城回族区" },
  { value: "xinzheng", label: "新郑市" },
  { value: "xinmi", label: "新密市" },
  { value: "dengfeng", label: "登封市" },
  { value: "gongyi", label: "巩义市" },
  { value: "zhongmou", label: "中牟县" },
  { value: "kaifeng", label: "开封市" },
  { value: "luoyang", label: "洛阳市" },
  { value: "anyang", label: "安阳市" },

  // 其他省会城市
  { value: "guangzhou", label: "广州市" },
  { value: "shenzhen", label: "深圳市" },
  { value: "nanjing", label: "南京市" },
  { value: "wuhan", label: "武汉市" },
  { value: "chengdu", label: "成都市" },
  { value: "xian", label: "西安市" },
  { value: "hangzhou", label: "杭州市" },
  { value: "jinan", label: "济南市" },
  { value: "changsha", label: "长沙市" },
  { value: "harbin", label: "哈尔滨市" },
  { value: "shenyang", label: "沈阳市" },
]

export function CitySelector() {
  const [open, setOpen] = React.useState(false)
  const [selectedLocation, setSelectedLocation] = React.useState(
    locations.find((loc) => loc.value === "zhengdong") || locations[0],
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
            <CommandGroup heading="直辖市">
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
            </CommandGroup>
            <CommandGroup heading="河南省">
              {locations.slice(4, 21).map((location) => (
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
              {locations.slice(21).map((location) => (
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
