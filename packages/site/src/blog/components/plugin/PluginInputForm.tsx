import React from "react";
import { PluginInput, PluginInputFieldType } from "@/plugin/Plugin";
import {
  z,
  zodResolver,
  useForm,
  Form,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Button,
  ButtonType,
  FormControl,
} from "@bbki.ng/components";
import { PluginDrawer } from "@/components/plugin/PluginDrawer";
import { DialogProps } from "vaul";

type PluginInputFormProps = {
  input: PluginInput;
  onSubmit: (input: string) => void;
} & Pick<DialogProps, "open"> &
  Pick<DialogProps, "onOpenChange">;

const getPluginInputSchema = (input: PluginInput) => {
  const obj: any = {};
  const typeMap = {
    [PluginInputFieldType.String]: z.string().default(""),
    [PluginInputFieldType.Number]: z.number().default(0),
    [PluginInputFieldType.Boolean]: z.boolean().default(false),
  };

  input.forEach((item) => {
    obj[item.name] = typeMap[item.type];
  });

  return z.object(obj);
};

const getInputDefaultValue = (type: PluginInputFieldType) => {
  switch (type) {
    case PluginInputFieldType.String:
      return "";
    case PluginInputFieldType.Number:
      return 0;
    case PluginInputFieldType.Boolean:
      return false;
  }
};

const getPluginDefaultInput = (input: PluginInput) => {
  const obj: any = {};
  input.forEach((item) => {
    obj[item.name] = getInputDefaultValue(item.type);
  });
  return obj;
};

const getInputType = (type: PluginInputFieldType) => {
  switch (type) {
    case PluginInputFieldType.String:
      return "text";
    case PluginInputFieldType.Number:
      return "number";
    case PluginInputFieldType.Boolean:
      return "checkbox";
  }
};

export const PluginInputForm = (props: PluginInputFormProps) => {
  const { input, onSubmit, open, onOpenChange } = props;
  const schema = getPluginInputSchema(input);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: getPluginDefaultInput(input),
  });

  const ok = (data: z.infer<typeof schema>) => {
    onSubmit(JSON.stringify(data));
  };

  return (
    <PluginDrawer open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(ok)}>
          {input.map((item) => {
            return (
              <FormField
                key={item.name}
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{item.name}</FormLabel>
                      <FormControl>
                        <Input type={getInputType(item.type)} {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
                name={item.name}
              />
            );
          })}
          <Button
            className="mt-16"
            onClick={() => {}}
            btnType="submit"
            type={ButtonType.PRIMARY}
          >
            Ok
          </Button>
        </form>
      </Form>
    </PluginDrawer>
  );
};
