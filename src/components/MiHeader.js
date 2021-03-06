import React from 'react';
import {Switch, Link, Route} from 'react-router-dom';
import SiteNav, {ContentGroup} from './MiNav'
 
const MiHeader = () =>
  (
    <div className='d-flex align-items-center justify-content-between w-100 bg-black'>
      <div className='px-5'>
        company logo
      </div>
      <SiteNav align='right' debug={false} rowHeight={100} color='white' background='black' navClass=' root-nav' >
        <ContentGroup title="services"  width="850" height="170" background='grey' rootUrl='#'>
          <ul>
            <li><a href="/#">Servicves </a></li>
            <li><a href="/#">Servicves </a></li>
            <li><a href="/#">Servicves </a></li>
            <li><a href="/#">Servicves </a></li>
            <li><a href="/#">Servicves </a></li>
            <li><a href="/#">Servicves </a></li>
          </ul>
        </ContentGroup>
        <ContentGroup title="Solutions"  width="991" height="270" background='pink' rootUrl='#'>
          <ul>
            <li><a href="/#">this is the new line for testing content flow</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>

          </ul>
        </ContentGroup>
        <ContentGroup title="Hire REsourses"  width="550" height="270" background='green' rootUrl='#'>
          <ul>
            <li><a href="/#">this is the new line for testing content flow</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>
            <li><a href="/#">My Story</a></li>

          </ul>
        </ContentGroup>
        <ContentGroup title="Solutions"  width="1050" height="500" background='skyblue' rootUrl='#'>
          <ul>
            <li><a href="/#">this is the new line for testing content flow</a></li>
            <li><a href="/#">solution we offer</a></li>
            <li><a href="/#">solution we offer</a></li>
            <li><a href="/#">solution we offer</a></li>
            <li><a href="/#">solution we offer</a></li>
            <li><a href="/#">solution we offer</a></li>

          </ul>
        </ContentGroup>
        <ContentGroup navItemClass='root-btn' title="btn" rootUrl='#'>
        </ContentGroup>
        <ContentGroup title="Contact"  width="500" height="100">
          some other links.<br/>
          <a href="#">Email</a><br/>
          <a href="#">Github</a>
        </ContentGroup>
      </SiteNav>
    </div>
  );

  export default MiHeader
 