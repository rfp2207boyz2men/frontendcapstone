import React, { useState, useEffect, useId } from 'react';
import { GoSearch } from 'react-icons/go';
import { GiTriquetra } from 'react-icons/gi'
import { BsSearch, BsBag } from 'react-icons/bs'
import styled, { ThemeProvider } from "styled-components";
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { lightTheme, darkTheme, GlobalStyles } from '../themes.js';

const Header = (props) => {


  return (
    <div className="header" onClick={props.trackClick}>
    <div className="logoheader">
      <div className="logotext"><h1>Odin</h1></div>
      <div className="logo"><GiTriquetra /></div>
    </div>
    <div className="toprightHeader">
      <div className="searchbar"><input className="search" placeholder="Search"></input><GoSearch className="searchIcon" /></div>
      <div className="shoppingBag"><BsBag />{props.cart && <div className='cart'>{props.cart.length}</div>}</div>
    </div>
    {
      props.theme === 'light' ?
      <div className='theme-toggler' onClick={props.themeToggler}>
        <div className='themeswitch'>
          <div><MdDarkMode /></div>
          <div className='themetext'>Theme</div>
        </div>
      </div>
      :
      <div className='theme-toggler' onClick={props.themeToggler}>
        <div className='themeswitch'>
          <div><MdLightMode /></div>
          <div className='themetext'>Theme</div>
        </div>
      </div>
    }
  </div>
  )
};

export default Header;