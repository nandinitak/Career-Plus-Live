// components/General.js

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/context/Setting"; // Import the useSettings hook

export default function General() {
  const { volume, updateVolume } = useSettings(); // Get volume and update function from context

  return (
    <main>
      {/* Existing Store Name Card */}
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Store Name</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Store Name" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>

      {/* Existing Plugins Directory Card */}
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Plugins Directory</CardTitle>
          <CardDescription>
            The directory within your project, in which your plugins are
            located.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input placeholder="Project Name" defaultValue="/content/plugins" />
            <div className="flex items-center space-x-2">
              <Checkbox id="include" defaultChecked />
              <label
                htmlFor="include"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Allow administrators to change the directory.
              </label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>

      {/* Existing Subscribe to Notifications Card */}
      <Card x-chunk="dashboard-04-chunk-3">
        <CardHeader>
          <CardTitle>Subscribe to Notifications</CardTitle>
          <CardDescription>
            Receive email notifications when new content is available.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => {}}>
            Subscribe
          </Button>
        </CardContent>
      </Card>

      {/* New Volume Control Card */}
      <Card x-chunk="dashboard-04-chunk-4">
        <CardHeader>
          <CardTitle>Volume Control</CardTitle>
          <CardDescription>
            Adjust the volume for notifications and other sounds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <label className="text-sm font-medium">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => updateVolume(parseFloat(e.target.value))}
            className="w-full mt-2"
          />
          <div className="text-xs text-gray-500">Current volume: {volume}</div>
        </CardContent>
      </Card>
    </main>
  );
}
