import React, { MouseEventHandler, ReactNode, useState } from "react";
import styles from "../styles/GlobalNavigationBar.module.scss";

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";

const GlobalNavigationBar: React.FunctionComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const onClickMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };
  const router = useRouter();
  const handleMenuRouter = (target: string): MouseEventHandler<HTMLElement> => {
    return (event) => {
      event.preventDefault();
      let url = target.toLowerCase();
      router.push("/" + url);
    };
  };

  const menuList: ReactNode = (
    <Box width={250} role="presentation">
      <List>
        {(["User", "Story", "Notice"] as const).map((menu, key) => (
          <ListItem
            key={key}
            className={styles.menu_list_item}
            onClick={handleMenuRouter(menu)}
          >
            {key == 0 ? (
              <PersonIcon />
            ) : key == 1 ? (
              <ArticleIcon />
            ) : (
              <NotificationsIcon />
            )}
            <ListItemText
              className={styles.menu_list_text}
              primary={menu}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "#FF6969" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="toggle-menu"
            onClick={onClickMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            <span onClick={() => router.push("/")}>Pple</span>
          </Typography>
        </Toolbar>

        <Drawer
          open={menuOpen}
          aria-label="admin-menu"
          onClose={onClickMenuOpen}
        >
          {menuList}
        </Drawer>
      </AppBar>
    </div>
  );
};

export default GlobalNavigationBar;
