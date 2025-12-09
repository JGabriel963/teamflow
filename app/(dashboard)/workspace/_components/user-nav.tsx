import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const user = {
  picture: "https://avatars.githubusercontent.com/u/124599?v=4",
  given_name: "Gideon",
};

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          className="size-12 rounded-l hover:rounded-lg transition-all duration-200 bg-background/50 border-border/50 hover:bg-accent hover:text-accent-foreground"
        >
          <Avatar>
            <AvatarImage
              src={user.picture}
              alt="User Image"
              className="object-cover"
            />
            <AvatarFallback>
              {user.given_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="right"
        sideOffset={8}
        className="w-[200px]"
      ></DropdownMenuContent>
    </DropdownMenu>
  );
}
