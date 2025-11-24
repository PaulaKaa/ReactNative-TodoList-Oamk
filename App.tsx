import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "./components/Task";

/*

Todo list app enables user to create list of tasks. Data is saved into phone’s memory.

User can also mark task as done/undone.
Requirements for the app are as follows.
• Display list of tasks
• User can add new task
• Task can be marked as done/undone by pressing a row/line on list
• Data is save into phone’s memory (AsyncStorage)
• App code is divided into (sub)components
Use previous exercises and here are also some resources which might be useful.

*/

//npm install @react-native-async-storage/async-storage

const STORAGE_KEY = "SHOPPING_LIST_ITEMS";

interface Task {
  id: string;
  name: string;
  done: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  //Add item function
  const addTask = () => {
    if (input.trim()) {
      setTasks((prev) => [
        ...prev,
        { id: Date.now().toString(), name: input.trim(), done: false },
      ]);
      setInput(""); //empty input
    }
  };

  //Marks done
  const getLineThrough = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // Load items from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setTasks(JSON.parse(json));
      } catch (e) {
        // handle error
      }
    })();
  }, []);

  // Save items to AsyncStorage whenever items change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter task"
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <Button
          mode="text"
          style={styles.button}
          textColor="#2196F3"
          onPress={addTask}
        >
          Save
        </Button>
      </View>
      <SwipeListView
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => (
          <Task 
          id={item.id}
          name={item.name}
          done={item.done}
          getLineThrough={getLineThrough}
          ></Task>
        )}
      ></SwipeListView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    marginTop: 32,
  },
  inputRow: {
    flexDirection: "row", //rivittää textinput ja button
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
  },
  button: {
    marginRight: 8,
  },

});
