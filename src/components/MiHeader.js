import React from 'react';
import {Switch, Link, Route} from 'react-router-dom';
import SiteNav, {ContentGroup} from './MiNav'
 
const MiHeader = () =>
  (
    <div>
      <SiteNav align='right'>
        <ContentGroup title="services"  width="850" height="170" background='grey'>
          <ul>
            <li><a href="/#">Servicves </a></li>
            <li><a href="/#">Servicves </a></li>
            <li><a href="/#">Servicves </a></li>
            <li><a href="/#">Servicves </a></li>
            <li><a href="/#">Servicves </a></li>
            <li><a href="/#">Servicves </a></li>

          </ul>
        </ContentGroup>
        <ContentGroup title="Solutions"  width="991" height="270" background='pink'>
          <ul>
            <li><a href="/#">this is the new line for testing content flow</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>

          </ul>
        </ContentGroup>
        <ContentGroup title="Solutions"  width="1050" height="500" background='skyblue'>
          <ul>
            <li><a href="/#">this is the new line for testing content flow</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>

          </ul>
        </ContentGroup>
        <ContentGroup title="Contact"  width="500" height="100">
          Free text followed by some links.<br/>
          <a href="#">Email</a><br/>
          <a href="#">Github</a>
        </ContentGroup>
      </SiteNav>
    </div>
  );

  export default MiHeader
 