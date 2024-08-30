"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps, DefaultValues } from "react-hook-form";
import { z } from "zod";

export type InferredZodSchema<T extends z.ZodType<any, any>> = z.infer<T>;

export function useZodForm<T extends z.ZodType<any, any>>(
  schema: T,
  options?: Omit<UseFormProps<InferredZodSchema<T>>, "resolver"> & {
    defaultValues?: DefaultValues<InferredZodSchema<T>>;
    onSubmit?: (validatedData: InferredZodSchema<TZodRawShape>) => void;
  }
) {
  const form = useForm<InferredZodSchema<T>>({
    resolver: zodResolver(schema),
    mode: options?.mode || "all",
    defaultValues: options?.defaultValues,
    ...options,
  });

  return {
    form,
    onSubmit: options?.onSubmit
      ? form.handleSubmit(options.onSubmit)
      : undefined,
  };
}

// Usage example
// import { useZodForm } from "@/components/form/useZodForm";
// import { Form } from "@/components/ui/form";


// const { form, onSubmit } = useZodForm("Put Schema Here", {
//   defaultValues: ,
//   onSubmit: ,
// });

//  <Form {...form}>
//   <form onSubmit={onSubmit}>

//   </form>
// </Form> 