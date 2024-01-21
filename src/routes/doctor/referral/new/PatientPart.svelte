    <!-- <h2 class="text-xl">Patient</h2>
    <div class="mt-5">
        <Label for="Patient" class={cn(labelClass)}>Patient Search</Label>
        <Input type="text" id="Patient" placeholder="1234567890123" />
    </div>
    <div class="mt-5">
        <Label for="CitizenId" class={cn(labelClass)}>Citizen ID</Label>
        <Input type="text" id="CitizenId" name="CitizenId" placeholder="1234567890123" />
    </div>
    <div class="mt-5">
        <Label for="Prefix" class="font-semibold text-[11pt] block mb-1">Prefix</Label>
        <Select.Root >
            <Select.Trigger id="Prefix">
              <Select.Value placeholder="Select a Prefix" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Item value="mr" label="Mr.">Mr.</Select.Item>
                <Select.Item value="ms" label="Ms.">Ms.</Select.Item>
                <Select.Item value="mrs" label="Mrs.">Mrs.</Select.Item>
              </Select.Group>
            </Select.Content>
            <Select.Input name="Prefix" />
          </Select.Root>
    </div>
    <div class="mt-5">
        <Label for="FirstName" class={cn(labelClass)}>First Name</Label>
        <Input type="text" id="FirstName" name="FirstName" placeholder="" />
    </div>
    <div class="mt-5">
        <Label for="LastName" class={cn(labelClass)}>Last Name</Label>
        <Input type="text" id="LastName" name="LastName" placeholder="" />
    </div>
    <div class="mt-5">
        <Label for="Address" class={cn(labelClass)}>Address</Label>
        <Input type="text" id="Address" name="Address" placeholder="" />
    </div>
    <div class="mt-5">
        <Label for="BirthDate" class={cn(labelClass)}>Birth Date</Label>
        <Popover.Root>
            <Popover.Trigger asChild let:builder>
              <Button
                variant="outline"
                id="BirthDate"
                class={cn(
                  " justify-start text-left font-normal",
                  !value && "text-muted-foreground"
                )}
                builders={[builder]}
              >
              <img src={calendarIcon} alt="Calendar" class="mr-2 h-4 w-4"/>
                {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
              </Button>
            </Popover.Trigger>
            <Popover.Content class="w-auto p-0" align="start">
              <Calendar bind:value />
            </Popover.Content>
          </Popover.Root>
    </div>
    <div class="mt-5">
        <Label for="Gender" class={cn(labelClass)}>Gender</Label>
        <RadioGroup.Root id="Gender" value="male">
            <div class="flex items-center space-x-2 mt-1">
                <RadioGroup.Item value="male" id="male" />
                <Label for="male">Male</Label>
            </div>
            <div class="flex items-center space-x-2 mt-3">
                <RadioGroup.Item value="female" id="female" />
                <Label for="female">Female</Label>
            </div>
        </RadioGroup.Root>
    </div>
    <div class="mt-5">
        <Label for="Telephone" class={cn(labelClass)}>Telephone</Label>
        <Input type="text" id="Telephone" name="Telephone" placeholder="0987654321" />
    </div> -->