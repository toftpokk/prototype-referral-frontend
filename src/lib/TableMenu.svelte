<script lang="ts">
    import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import type { HTMLTableAttributes } from "svelte/elements";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

	// type $$Props = HTMLTableAttributes;
	let className : string = "";
    let url = "/";
	export { className as class, url };
  </script>
  
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline" class={cn("w-full caption-bottom text-sm", className)}>
        <slot/>
    </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item href={url}>
            View Details
          </DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>