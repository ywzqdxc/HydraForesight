import { CloudRain } from "lucide-react" // Assuming CloudRain is an icon component
;<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div className="flex items-center gap-2">
    <CloudRain className="h-5 w-5 text-blue-500" />
    <span className="font-semibold">智水先知</span>
  </div>
  <p className="text-sm text-muted-foreground">智水先知 &copy; {new Date().getFullYear()} | 城市洪涝监测与预警系统</p>
</div>
