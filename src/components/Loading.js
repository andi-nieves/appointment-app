import { FormikContext,  } from 'formik';
import React, { useContext, useEffect } from 'react';
import useAppStore from '../stores/app';
import { View } from 'react-native';
import LoadingSpinner from './icons/Spinner';

export function LoadingListener({ isSubmitting }) {
    const { setState } = useAppStore()
    useEffect(() => {
        setState({ loading: isSubmitting })
    }, [isSubmitting])
    return <View />
}
export default function Loading() {
    const { loading } = useAppStore()
    if (!loading) return
    return <View className="flex-1 w-full h-full absolute top-0 left-0 z-[1000] items-center justify-center"><LoadingSpinner /></View>
}