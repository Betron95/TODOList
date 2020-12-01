import React, { ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { IToDoList } from "../ToDoLists/ToDoLists";
import ToDoList from '../ToDoList/ToDoList';
import { Button, ButtonContainer } from '../../styles/common';

type numberOrStringType = number | string;

export interface TabPanelProps {
  children: React.ReactNode,
  index: numberOrStringType,
  value: numberOrStringType
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function MyTabs({ toDoLists, handleRemoveItemHandler }:
  { toDoLists: IToDoList[], handleRemoveItemHandler: (closeDialog: boolean, list: IToDoList) => void }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const theme = createMuiTheme({
    overrides: {
      MuiTab: {
        root: {
          color: "palevioletred",
          "&$selected": {
            color: "palevioletred",
            "&:hover": {
              color: "palevioletred"
            }
          }
        },
        textColorPrimary: {
          color: 'gray',
          '&$selected': {
            color: 'palevioletred',
          }
        },
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            TabIndicatorProps={{ style: { background: 'palevioletred' } }}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {toDoLists.map((list, index) =>
              <Tab label={list.name} key={index} {...a11yProps(index)} />
            )}
          </Tabs>
        </AppBar>
        {toDoLists.map((list, index) =>
          <TabPanel value={value} key={index} index={index}>
            <ButtonContainer>
              <Button onClick={() => handleRemoveItemHandler(true, list)}>Remove this list</Button>
            </ButtonContainer>
            <ToDoList currentList={list} />
          </TabPanel>
        )}
      </div>
    </MuiThemeProvider>
  );
}

export default MyTabs;
