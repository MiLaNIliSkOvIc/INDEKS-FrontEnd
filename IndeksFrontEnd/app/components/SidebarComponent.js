import React from "react";
import { View, Button } from "react-native";
import GenericSidebarComponent from "./GenericSidebarComponent";

const SidebarComponent = ({ visible, onClose }) => {
  const menuItems = [
    {
      label: "Aktivni razgovori",
      icon: "comments",
      route: "ChatList",
      iconType: "FontAwesome",
    },
    {
      label: "Materijali",
      icon: "folder",
      route: "Materijali",
      iconType: "FontAwesome",
    },
    {
      label: "Raspored",
      icon: "calendar",
      route: "Schedule",
      iconType: "FontAwesome",
    },
    {
      label: "Oglasi",
      icon: "bullhorn",
      route: "Ads",
      iconType: "FontAwesome",
    },
    {
      label: "Instrukcije",
      icon: "book",
      route: "Instruction",
      iconType: "FontAwesome",
    },
    {
      label: "Osnovne grupe",
      icon: "users",
      route: "ElementaryGroupChat",
      iconType: "FontAwesome",
    },
    {
      label: "Prijavljeni problemi",
      icon: "alert-triangle",
      route: "Problems",
      iconType: "Feather",
    },
    {
      label: "Moja ponuda",
      icon: "book",
      route: "ListOfMyInstructionsScreen",
      iconType: "Feather",
    },
    {
      label: "Podešavanja",
      icon: "settings",
      route: "SettingsScreen",
      iconType: "Feather",
    },
    {
      label: "Registrovani korisnici",
      icon: "settings",
      route: "RegisteredUsersScreen",
      iconType: "Feather",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <GenericSidebarComponent
        visible={visible}
        onClose={onClose}
        menuItems={menuItems}
      />
    </View>
  );
};

export default SidebarComponent;
