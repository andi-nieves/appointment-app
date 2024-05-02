import React, { useEffect, useMemo, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { cloneDeep, range } from "lodash";
import ArrowLeftComponent from "@src/app/components/icons/ArrowLeft";
import ArrowRightComponent from "@src/app/components/icons/ArrowRight";

const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthNames = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const defaultEvent = new Date();

export default function Calendar({
  onSelect,
}) {
  const [list, setList] = useState()
  const [selected, setSelected] = useState(new Date());
  const [width, setWidth] = useState(0);
  const [current, setCurrent] = useState(defaultEvent);
  const itemHeight = useMemo(() => width / 1.33 / 6, [width]);

  useEffect(() => {
    const event = cloneDeep(current);
    event.setDate(1);
    const start = 0 - event.getDay();
    event.setDate(start);
    const dates = range(0, 35).map(() => {
      event.setDate(event.getDate() + 1);
      return new Date(event);
    });
    setList([...dates]);
  }, [current]);

  return (
    <View
      onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width);
      }}
    >
      <View className='flex-row justify-between items-center mb-3'>
        <TouchableOpacity
          onPress={() => {
            current.setMonth(current.getMonth() - 1);
            setCurrent(new Date(current));
          }}
        >
          <ArrowLeftComponent />
        </TouchableOpacity>
        <Text className='font-bold'>
          {monthNames[new Date(current).getMonth()]}{" "}
          {new Date(current).getFullYear()}
        </Text>
        <TouchableOpacity
          onPress={() => {
            current.setMonth(current.getMonth() + 1);
            setCurrent(new Date(current));
          }}
        >
          <ArrowRightComponent />
        </TouchableOpacity>
      </View>

      <FlatList
        data={weekNames}
        numColumns={7}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <View
              key={item}
              className={`flex-1 justify-center items-center rounded-lg`}
              style={{ minHeight: itemHeight }}
            >
              <Text className='font-normal text-gray-500'>{item}</Text>
            </View>
          );
        }}
      />

      <FlatList
        data={list}
        numColumns={7}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const isSelected =
            item.toLocaleDateString() === selected?.toLocaleDateString();
          return (
            <TouchableOpacity
              key={item.toLocaleDateString()}
              className={`flex-1 justify-center items-center rounded-lg ${isSelected ? "bg-primary-700" : ""}`}
              onPressIn={() => {
                setSelected(item);
                onSelect(item);
              }}
              style={{ minHeight: itemHeight }}
            >
              <Text className={`font-bold ${isSelected ? "text-white" : ""}`}>
                {new Date(item).getDate()}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
