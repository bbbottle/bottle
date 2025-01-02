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
} from "@bbki.ng/components";

type PluginInputFormProps = {
  input: PluginInput;
  onSubmit: (input: string) => void;
};

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
  const { input, onSubmit } = props;
  const schema = getPluginInputSchema(input);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: schema.parse({}),
  });

  const ok = (data: z.infer<typeof schema>) => {
    onSubmit(JSON.stringify(data));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(ok)}>
        {input.map((item) => {
          return (
            <FormField
              key={item.name}
              control={form.control}
              // @ts-ignore
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{item.name}</FormLabel>
                    <Input type={getInputType(item.type)} {...field} />
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
  );
};
