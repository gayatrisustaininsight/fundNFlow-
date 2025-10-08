'use client'
import { ComponentProps } from 'react'
import { useForm, Controller, FieldValues, SubmitHandler } from 'react-hook-form'

type FormProps<TFieldValues extends FieldValues> = {
    defaultValues: Partial<TFieldValues>
    onSubmit: SubmitHandler<TFieldValues>
    children: (args: { control: any; submitting: boolean }) => React.ReactNode
} & Omit<ComponentProps<'form'>, 'onSubmit'>

export function Form<TFieldValues extends FieldValues>({ defaultValues, onSubmit, children, ...rest }: FormProps<TFieldValues>) {
    const { control, handleSubmit, formState } = useForm<TFieldValues>({ defaultValues })
    return (
        <form {...rest} onSubmit={handleSubmit(onSubmit)}>
            {children({ control, submitting: formState.isSubmitting })}
        </form>
    )
}

export { Controller }


