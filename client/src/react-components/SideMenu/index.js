import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

function SideMenu() {
  return (
    <div>
      <Drawer
        variant="permanent"
        width="400"
        PaperProps={{
            sx: {width: "150%"}
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {["My information", "Transaction History", "Donated History", "Submit Feedback"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (SideMenu);