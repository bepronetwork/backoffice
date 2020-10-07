import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #894798',
  },
  indicator: {
    backgroundColor: '#894798',
  },
})(Tabs);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#894798',
    },
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#894798',
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))(props => <Tab disableRipple {...props} />);


function TabPanel(props) {
    const { children, value, index, padding, ...other } = props;
  
    return (
      <div
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        <Box p={3} style={{ padding: padding === false ? 0 : 24 }}>{children}</Box>
      </div>
    );
  }


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: "#fafcff",
  },
  demo2: {
    backgroundColor: "#fafcff",
  },
}));

export default function HorizontalTabs({tabs, padding}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div className={classes.root} style={{ backgroundColor: "#fafcff" }}>
            <div className={classes.demo2}>
                <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                {tabs.map( t => <StyledTab label={t.label} />) }
                </StyledTabs>
            </div>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {tabs.map( (t, index) => {
                    return (
                        <TabPanel value={value} index={index} dir={theme.direction} padding={padding}>
                            {t.tab}
                        </TabPanel>
                    )
                })}
            </SwipeableViews>
        </div>
    );
}


