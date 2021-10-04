import {Grid } from "@mui/material"
import React, { Component } from "react"
import Header from "../Header"
import SideMenu from '../SideMenu'
import './index.css'

class Layout extends Component {
    
  render() {    
    const renderView=this.props.children
    return (
      <div>
        <Grid container maxWidth="xl">
          <Grid item xs={12} md={12} lg={12}>
            <Header/>
          </Grid>
          <Grid item xs={1} sm={3} md={2.5} lg={2} className="sidmenu-container">
            <SideMenu/>
          </Grid>
          <Grid item xs={12} sm={9} md={9.5} lg={10}>
            {renderView}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Layout
