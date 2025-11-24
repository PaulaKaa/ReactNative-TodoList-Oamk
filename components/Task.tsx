import * as React from "react";
import { Pressable, Text } from "react-native";

interface TaskProps {
  id: string;
  name: string;
  done: boolean;
  getLineThrough: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ id, name, done, getLineThrough }) => {
  return (
    <Pressable
      onPress={() => {
        getLineThrough(id);
      }}
    >
      <Text
        style={[{
          textDecorationLine: done ? "line-through" : "none",
        }, {marginLeft: 12,  marginBottom: 8}]}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default Task;