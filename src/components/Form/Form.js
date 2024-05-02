import { useFormik, Formik } from "formik";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import LoadingSpinner from "../icons/Spinner";
import React, { useContext, useEffect, useRef, useState } from "react";
import useAppStore from "../../stores/app";
import { LoadingListener } from "../Loading";


export default function Form({ children, ...props }) {
    const { loading, setState } = useAppStore()
    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={false}
            {...props}
        >
            {(formProps) =>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <ScrollView className="-mx-5 px-5 pt-5 flex-1" contentContainerStyle={{ flex: 1 }}>
                        <LoadingListener isSubmitting={formProps.isSubmitting} />
                        {children({ ...formProps })}
                    </ScrollView>
                </KeyboardAvoidingView>
            }
        </Formik>
    )
}