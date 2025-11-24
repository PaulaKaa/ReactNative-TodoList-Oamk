import * as React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

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
        style={[
          styles.margins,
          {
            textDecorationLine: done ? "line-through" : "none",
          },
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  margins: {
    marginLeft: 12,
    marginBottom: 8,
  },
});

export default Task;
