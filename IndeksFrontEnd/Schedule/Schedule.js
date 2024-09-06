import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from '../Sidebar/sidebar';

const days = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
const times = ['8:15', '9:15', '10:15', '11:15', '12:15', '13:15', '14:15', '15:15', '16:15', '17:15', '18:15', '19:15'];

const Schedule = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={toggleSidebar} >
      <Icon name="bars" size={30} color="#888" style={styles.headerIcon} />
      </TouchableOpacity>
        <Image 
          source={require('../pictures/logo.png')} 
          style={styles.headerLogo} 
        />
        <Text style={styles.headerText}>Raspored</Text>
        <TouchableOpacity>
          <Image 
            source={require('../pictures/search.png')} 
            style={styles.headerEditIcon} 
          />
        </TouchableOpacity>
      </View>

      {/* Days of the week */}
      <View style={styles.daysRow}>
        <Text style={styles.timeColumnHeader}>Vrijeme</Text>
        {days.map((day, index) => (
          <View key={index} style={styles.dayCell}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Schedule Grid */}
      {times.map((time, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.timeCell}>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          {days.map((_, idx) => (
            <View key={idx} style={styles.scheduleCell}>
              {/* Each cell in the schedule grid */}
            </View>
          ))}
        </View>
      ))}
        <Sidebar visible={isSidebarVisible} onClose={toggleSidebar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDEDED',
    paddingTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  headerLogo: {
    width: 60,
    height: 60,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#013868',
  },
  headerEditIcon: {
    width: 30,
    height: 30,
  },
  daysRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#013868',
  },
  timeColumnHeader: {
    width: 80,
    textAlign: 'center',
    paddingVertical: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  dayCell: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  dayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  timeCell: {
    width: 80,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDEDED',
  },
  timeText: {
    fontWeight: 'bold',
  },
  scheduleCell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    backgroundColor: '#F5F5F5',
  },
});

export default Schedule;
