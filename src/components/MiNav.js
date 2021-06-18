import React, {Component} from 'react';
import styled, {keyframes, css} from 'styled-components/macro';
import memoize from 'memoize-one';
import kebabCase from 'lodash.kebabcase';

const defaultRootAlign = 'center';
const defaultColor = '#fff';
const defaultColumnWidth = 100;
const defaultRowHeight = 90;
const defaultBackground = '#323232';
const defaultBreakpoint = 768;
const defaultContentBackground = '#fff';
const defaultContentColor = '#323232';
const defaultContentWidth = 320;
const defaultContentHeight = 200;
const defaultContentTop = 0;

const arrowHeight = 8;
const perspective = 850;

const fadeOutSeconds = 0.34;
const fadeInSeconds = 0.25;
const moveSeconds = 0.25;
const moveArrowSeconds = 0.28;
const fadeOutContentSeconds = 0.15;
const fadeInContentSeconds = 0.25;
const OffScreenPadding = 10;

const setFromProps = camelCaseKey => css`
  ${props => props[camelCaseKey] ? `${kebabCase(camelCaseKey)}: ${props[camelCaseKey]}` : null}`;

const GridContainer = styled.div`
  // use visibility hidden instead of display none because menu flashes when breakpoint changes for some reason!
  @media(max-width: ${({breakpoint}) => (breakpoint - 1)}px) {
    position: absolute;
    visibility: hidden;
  }
  
  @media(min-width: ${({breakpoint}) => breakpoint}px) {
    display: grid;
    padding: 0 10px;
    ${setFromProps('justifyContent')};
    justify-items: stretch;
    //grid-template-columns: 100px 100px auto repeat(3, 100px);
    grid-template-columns: auto;
     //grid-template-columns: repeat(${({columns}) => columns}, ${({columnWidth}) => columnWidth}px);
    grid-gap: 0 20px;
    grid-template-rows: ${({rowHeight}) => rowHeight}px;
    position: relative;
  }
`;
const GridItemLink = styled.a`
  grid-column: ${({index}) => index + 1} / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  //white-space: nowrap;

  &:hover {
    //opacity: 0.5;
  }
  ${setFromProps('color')};
  
  &:visited {
    ${setFromProps('color')};
  }
`;
const GridItem = styled.div`
  grid-column: ${({index}) => index + 1} / span 1;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  color: ${({active}) => active ? 'red' : ''};
  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 0;
    height: 2px;
    background: red;
    transition: width .3s;
  }
  &:hover {
    color: red;
    opacity: 1;
    cursor: pointer;
    &::after{
      width: 100%;
    }
  }
`;
const ContentRow = styled.div`
  grid-column: 1 / span ${({columns}) => columns};
  grid-row: 2 / span 1;
  //position: relative;
  height: 0;
`;
const Move = (fromData, toData) => keyframes`
  from {
    //left: ${fromData.left}px;
    width: ${fromData.width}px;
    height: ${fromData.height}px;
  }
  
  to {
    //left: ${toData.left}px;
    width: ${toData.width}px;
    height: ${toData.height}px;
  }
`;
const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: perspective(${perspective}px) rotateX(-60deg);
    transform-origin: top center;
  }
  
  to {
    opacity: 1;
    transform: perspective(${perspective}px) rotateX(0deg);
    transform-origin: top center;
  }
`;
const FadeOut = keyframes`
  from {
    opacity: 1;
    transform: perspective(${perspective}px) rotateX(0deg);
    transform-origin: top center;
  }
  
  to {
    opacity: 0;
    transform: perspective(${perspective}px) rotateX(-60deg);
    transform-origin: top center;
    visibility: hidden;
  }
`;
const MovingDiv = styled.div`
  opacity: 1;
  overflow: hidden;
  ${setFromProps('color')};
  ${setFromProps('background')};
  position: absolute;
   top: ${({top}) => top}px;
  //top: 100px;
  //left: ${({fromData}) => fromData ? fromData.left : 0}px;
  right: ${({fromData}) => fromData ? fromData.right : 0}px;
  right: 10px;
  width: ${({fromData}) => fromData ? fromData.width : 0}px;
  height: ${({fromData}) => fromData ? fromData.height : 0}px;
  display: ${({display}) => display};
  border-radius: 4px;
  box-shadow: 0 8px 28px 1px rgba(138,126,138,0.67);
  animation: ${({fadeOut, display, fromData, toData}) => {
  if (fadeOut) return FadeOut;
  if (display === 'block') {
    if (fromData.left === toData.left) return FadeIn;
    if (fromData) return Move(fromData, toData);
  }
  return ''; // display: none; don't animate
}}
  
  // fade out and in slower than moving sideways
  ${({fadeOut, display, fromData, toData}) => {
  if (fadeOut) return `${fadeOutSeconds}s`;
  if (display === 'block') {
    if (fromData.left === toData.left) return `${fadeInSeconds}s`; // fade in
    if (fromData) return `${moveSeconds}s`; // move
  }
  return '0s'; // display: none; don't animate
}}
  
  forwards ease;
`;
const FadeInArrow = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;
const FadeOutArrow = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`;
const calculateArrowMarginLeft = (data, leftOffset, rightOffset) => css`
  margin-left: ${
  data ? data.left + (data.width / 2) - leftOffset + rightOffset - arrowHeight
    - (leftOffset > 0 || rightOffset > 0 ? OffScreenPadding : 0)
    : 0
  }px;
`;
const MoveArrow = (fromData, toData, leftOffset, rightOffset) => keyframes`
  from {
    ${calculateArrowMarginLeft(fromData, leftOffset, rightOffset)}
  }
  
  to {
    ${calculateArrowMarginLeft(toData, leftOffset, rightOffset)}
  }
`;
const Arrow = styled.div`
  top: -${({top}) => (arrowHeight - top)}px;
  z-index: 1;
  position: absolute;
  ${({toData, leftOffset, rightOffset}) => calculateArrowMarginLeft(toData, leftOffset, rightOffset)}
  display: ${({display, toData}) => {
  if (toData && toData.width === 0 && toData.height === 0) {
    return 'none';
  }
  return display;
}};
  width: 0; 
  height: 0;
  border-left: ${arrowHeight}px solid transparent;
  border-right: ${arrowHeight}px solid transparent;
  border-bottom: ${arrowHeight}px solid ${({background}) => background};
  animation: ${({fadeOut, display, fromData, toData, leftOffset, rightOffset}) => {
  if (fadeOut) return FadeOutArrow;
  if (display === 'block') {
    if (fromData.left === toData.left) return FadeInArrow;
    if (fromData) return MoveArrow(fromData, toData, leftOffset, rightOffset);
  }
  return ''; // display: none; don't animate
}}
  
  // fade out and in slower than moving sideways
  ${({fadeOut, display, fromData, toData}) => {
  if (fadeOut) return `${fadeOutSeconds}s`;
  if (display === 'block') {
    if (fromData.left === toData.left) return `${fadeInSeconds}s`; // fade in
    if (fromData) return `${moveArrowSeconds}s`; // move
  }
  return '0s'; // display: none; don't animate
}}
  
  forwards ease;
`;
const FadeInContent = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
const FadeOutContent = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  
  to {
    opacity: 0;
    transform: translateX(-50px);
    visibility: hidden;
  }
`;
const ContentGroupContainer = styled.div`
  position: absolute;
  margin-top: 0;
  margin-bottom: 0;
  padding: 15px;
  width: 100%;
  height: 100%;
  opacity: ${({show}) => show ? 1 : 0};
  z-index: ${({show}) => show ? 1 : 0};
  pointer-events: ${({show}) => show ? 'auto' : 'none'}; // disregard mouse event if content group is inactive
  animation: ${({show, fadeOut}) => {
  if (show) return FadeInContent;
  if (fadeOut) return FadeOutContent;
  return ''; // cold start and everything else just show without animation 
}} 
  ${({show}) => show ? `${fadeInContentSeconds}` : `${fadeOutContentSeconds}`}s
  forwards;
`;
export const ContentGroup = ({title, width, height, background}) => {
  return (
    <>
      {title}
      {width}x{height}
      {background}
    </>
  );
};

export default class SiteNav extends Component {
  state = {display: 'none', fadeOut: false, fromData: null, toData: null, leftOffset: 0, rightOffset: 0};

  static defaultProps = {
    align: defaultRootAlign,
    columnWidth: defaultColumnWidth,
    rowHeight: defaultRowHeight,
    background: defaultBackground,
    contentBackground: defaultContentBackground,
    contentColor: defaultContentColor,
    contentTop: defaultContentTop,
    breakpoint: defaultBreakpoint,
    color: defaultColor,
    debug: false,
    navClass: ""
  };

  /**
   * Injects index and left properties into MenuData
   */
  memoizeMenuData = memoize((columnWidth, children) => React.Children.map(children, (child, i) => {
    // if width and height are not specified, that means we don't want to render the content group i.e. we only
    // want to render root item
    const {width, height} = child.props;
    let sanitisedWidth, sanitisedHeight;

    if (!width && !height) {
      sanitisedWidth = 0;
      sanitisedHeight = 0;
    } else {
      // if width or height is not specified, add defaults
      sanitisedWidth = width || defaultContentWidth;
      sanitisedHeight = height || defaultContentHeight;
    }

    return {
      ...child.props, // order is important here! spread child.props after height, followed by width.
      height: sanitisedHeight,
      width: sanitisedWidth,
      index: i,
      // left: (((i + 1) * columnWidth) - (columnWidth / 2)) - (sanitisedWidth / 2),
      // left: (( columnWidth[i]) + (columnWidth[i] / 2)) - (sanitisedWidth / 2),
      left: window.innerWidth - sanitisedWidth,
      right: 0
    };
  }));
  memoizeGridItems = memoize((children, color, toData) => React.Children.map(children, (child, i) => {
      const {title, rootUrl, navItemClass} = child.props;

      if (rootUrl) {
        return (
          <GridItemLink
            href={rootUrl}
            active={toData && toData.index === i}
            key={`menu-title-${i}`}
            index={i}
            onMouseEnter={(e) => this.onMouseEnter(e.target, i)}
            color={color}
            className={navItemClass}
          >
            <span>
            {title}
            </span>
          </GridItemLink>
        );
      }
      return (
        <GridItem
          key={`menu-title-${i}`}
          active={toData && toData.index === i}
          index={i}
          onMouseEnter={(e) => this.onMouseEnter(e.target, i)}
          color={color}
        >
          {/*<span>*/}
          {title}
          {/*</span>*/}
        </GridItem>
      );
    }
  ));
  memoizeContent = memoize((children, fromData, toData) => React.Children.map(children, (child, i) => (
    <ContentGroupContainer
      key={`content-group-${i}`}
      show={toData && toData.index === i}
      fadeOut={fromData && fromData.index === i}
    >
      {child.props.children}
    </ContentGroupContainer>
  )));
  memoizeColumns = memoize(children => React.Children.count(children));
  memoizeAlign = memoize(align => {
    switch (align) {
      case 'left':
        return 'start';
      case 'right':
        return 'end';
      default:
        return 'center';
    }
  });

  close = () => {
    if (this.props.debug) return;
    this.setState((prevState) => ({fadeOut: true, fromData: prevState.toData}));
  };
  onMouseEnter = (target, menuDataIndex) => {
    this.setState((prevState) => {
      const fadeOut = false;
      const display = 'block';
      const toDataOriginal = this.memoizeMenuData(this.props.columnWidth, this.props.children)[menuDataIndex];
      const toData = {...toDataOriginal};
      let leftOffset = 0;
      let rightOffset = 0;

      if (target) { // off screen detection
        // target is rootGridItem
        const {left, right, width} = target.getBoundingClientRect();
        // const siteNavWidth = target.parentNode.clientWidth;
        const siteNavWidth = window.innerWidth;
        leftOffset = (toData.width / 2) - (left + (width / 2));
        rightOffset = (toData.width / 2) - (siteNavWidth - (left + (width / 2)));
        // if (leftOffset > 0) {
        //   // if off screen, toData.left needs to be moved to be on-screen!
        //   toData.left += leftOffset + OffScreenPadding;
        // } else {
        //   leftOffset = 0;
        // }
        //
        // if (rightOffset > 0) {
        //   toData.left -= rightOffset + OffScreenPadding;
        // } else {
        //   rightOffset = 0;
        // }
        let fromData;
        if (prevState.fadeOut || !prevState.toData) {
          // on cold start, pop up right from the current item
          fromData = toData;
        } else {
          // on warm start, start animation from the previous item
          fromData = prevState.toData;
        }

        return {
          display,
          fadeOut,
          fromData,
          toData,
          leftOffset,
          rightOffset,
        };
      }
    });
  };
  onMouseLeave = () => this.close();
  onClickMovingDiv = () => this.close();

  render() {
    const {
      columnWidth, rowHeight, background, contentBackground, contentColor, contentTop,
      children, align, fontSize, fontFamily, color, breakpoint, navClass
    } = this.props;
    const {fromData, toData, display, fadeOut, leftOffset, rightOffset} = this.state;
    const columns = this.memoizeColumns(children);
    const rootGridItems = this.memoizeGridItems(children, color, toData);
    const content = this.memoizeContent(children, fromData, toData);
    const justifyContent = this.memoizeAlign(align);
    const contentBackgroundSanitised = (toData && toData.background) || contentBackground;

    return (
      <nav className={navClass}>
        <GridContainer
          background={background}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          justifyContent={justifyContent}
          fontSize={fontSize}
          fontFamily={fontFamily}
          color={color}
          breakpoint={breakpoint}

          /* Below are not configurable */
          onMouseLeave={this.onMouseLeave}
          columns={columns}
        >
          {rootGridItems}
          <ContentRow columns={columns}>
            {/* <Arrow
              display={display}
              fadeOut={fadeOut}
              fromData={fromData}
              toData={toData}
              top={contentTop}
              onClick={this.onClickMovingDiv}
              background={contentBackgroundSanitised}
              leftOffset={leftOffset}
              rightOffset={rightOffset}
            /> */}
            <MovingDiv
              display={display}
              fadeOut={fadeOut}
              fromData={fromData}
              toData={toData}
              color={contentColor}
              // top={contentTop}
              top={rowHeight}
              onClick={this.onClickMovingDiv}
              background={contentBackgroundSanitised}
            >
              {content}
            </MovingDiv>
          </ContentRow>
        </GridContainer>
      </nav>
    );
  }
}