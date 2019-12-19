import React, { useState } from "react";
import { injectIntl } from "react-intl";

import { DropdownItem, DropdownMenu, DropdownToggle, Input, UncontrolledDropdown } from "reactstrap";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { changeLocale, clickOnMobileMenu, logoutUser, setContainerClassnames } from "../../redux/actions";

import { isDarkSwitchActive, localeOptions, menuHiddenBreakpoint } from "../../constants/defaultValues";

import { MenuIcon, MobileMenuIcon } from "../../components/svg";
import TopnavEasyAccess from "./Topnav.EasyAccess";
import TopnavDarkSwitch from "./Topnav.DarkSwitch";
import { VERIFY_USER } from '../../graphql/requests'

import { getDirection, setDirection } from "../../helpers/Utils";
import { useQuery, } from "@apollo/react-hooks";

let TopNav = (props) => {

    const [isFullScreen, setIsFullScreen] = useState(false)

    let handleChangeLocale = (locale, direction) => {
        props.changeLocale(locale);

        const currentDirection = getDirection().direction;
        if (direction !== currentDirection) {
            setDirection(direction);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    };
    let checkFullScreen = () => {
        return (
            (document.fullscreenElement && document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement &&
                document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement &&
                document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement && document.msFullscreenElement !== null)
        );
    };
    let handleSearchIconClick = e => {
        if (window.innerWidth < menuHiddenBreakpoint) {
            let elem = e.target;
            if (!e.target.classList.contains("search")) {
                if (e.target.parentElement.classList.contains("search")) {
                    elem = e.target.parentElement;
                } else if (
                    e.target.parentElement.parentElement.classList.contains("search")
                ) {
                    elem = e.target.parentElement.parentElement;
                }
            }

            if (elem.classList.contains("mobile-view")) {
                search();
                elem.classList.remove("mobile-view");
                removeEventsSearch();
            } else {
                elem.classList.add("mobile-view");
                addEventsSearch();
            }
        } else {
            search();
        }
    };
    let addEventsSearch = () => {
        document.addEventListener("click", handleDocumentClickSearch, true);
    };
    let removeEventsSearch = () => {
        document.removeEventListener("click", handleDocumentClickSearch, true);
    };

    let handleDocumentClickSearch = e => {
        let isSearchClick = false;
        if (
            e.target &&
            e.target.classList &&
            (e.target.classList.contains("navbar") ||
                e.target.classList.contains("simple-icon-magnifier"))
        ) {
            isSearchClick = true;
            if (e.target.classList.contains("simple-icon-magnifier")) {
                search();
            }
        } else if (
            e.target.parentElement &&
            e.target.parentElement.classList &&
            e.target.parentElement.classList.contains("search")
        ) {
            isSearchClick = true;
        }

        if (!isSearchClick) {
            const input = document.querySelector(".mobile-view");
            if (input && input.classList) input.classList.remove("mobile-view");
            removeEventsSearch();
        }
    };
    let handleSearchInputChange = e => {
    };
    let handleSearchInputKeyPress = e => {
        if (e.key === "Enter") {
            search();
        }
    };

    let search = () => {
    };

    let toggleFullScreen = () => {
        const isInFullScreen = checkFullScreen();

        var docElm = document.documentElement;
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        setIsFullScreen(!isFullScreen);
    };

    let handleLogout = () => {
        props.logoutUser(props.history);
    };

    let menuButtonClick = (e, menuClickCount, containerClassnames) => {
        e.preventDefault();

        setTimeout(() => {
            var event = document.createEvent("HTMLEvents");
            event.initEvent("resize", false, false);
            window.dispatchEvent(event);
        }, 350);
        props.setContainerClassnames(
            ++menuClickCount,
            containerClassnames,
            props.selectedMenuHasSubItems
        );
    };
    let mobileMenuButtonClick = (e, containerClassnames) => {
        e.preventDefault();
        props.clickOnMobileMenu(containerClassnames);
    };

    let { data } = useQuery(VERIFY_USER);
    let user = null;
    if (data) {
        user = data.verifyAdmin;
    }
    const { containerClassnames, menuClickCount, locale, } = props;
    const { messages } = props.intl;
    return (
        <nav className="navbar fixed-top">
            <div className="d-flex align-items-center navbar-left">
                <NavLink
                    to="#"
                    className="menu-button d-none d-md-block"
                    onClick={e =>
                        menuButtonClick(e, menuClickCount, containerClassnames)
                    }
                >
                    <MenuIcon />
                </NavLink>
                <NavLink
                    to="#"
                    className="menu-button-mobile d-xs-block d-sm-block d-md-none"
                    onClick={e => mobileMenuButtonClick(e, containerClassnames)}
                >
                    <MobileMenuIcon />
                </NavLink>

                <div className="search" data-search-path="/app/pages/search">
                    <Input
                        name="searchKeyword"
                        id="searchKeyword"
                        placeholder={messages["menu.search"]}
                        onChange={e => handleSearchInputChange(e)}
                        onKeyPress={e => handleSearchInputKeyPress(e)}
                    />
                    <span
                        className="search-icon"
                        onClick={e => handleSearchIconClick(e)}
                    >
                        <i className="simple-icon-magnifier" />
                    </span>
                </div>

                <div className="d-inline-block">
                    <UncontrolledDropdown className="ml-2">
                        <DropdownToggle
                            caret
                            color="light"
                            size="sm"
                            className="language-button">
                            <span className="name">{locale.toUpperCase()}</span>
                        </DropdownToggle>
                        <DropdownMenu className="mt-3" right>
                            {localeOptions.map(l => {
                                return (
                                    <DropdownItem
                                        onClick={() => handleChangeLocale(l.id, l.direction)}
                                        key={l.id}
                                    >
                                        {l.name}
                                    </DropdownItem>
                                );
                            })}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </div>
            <div className="navbar-right">
                {isDarkSwitchActive && <TopnavDarkSwitch />}
                <div className="header-icons d-inline-block align-middle">
                    <TopnavEasyAccess />
                    <button
                        className="header-icon btn btn-empty d-none d-sm-inline-block"
                        type="button"
                        id="fullScreenButton"
                        onClick={toggleFullScreen}
                    >
                        {isFullScreen ? (
                            <i className="simple-icon-size-actual d-block" />
                        ) : (
                                <i className="simple-icon-size-fullscreen d-block" />
                            )}
                    </button>
                </div>
                {data && <div className="user d-inline-block">
                    <UncontrolledDropdown className="dropdown-menu-right">
                        <DropdownToggle className="p-0" color="empty">
                            <span className="name mr-1">{`${user.firstname} ${user.lastname}`}</span>
                            <span>
                                <img alt="Profile" src={user.profile_picture} />
                            </span>
                        </DropdownToggle>
                        <DropdownMenu className="mt-3" right>
                            <DropdownItem>Account</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => handleLogout()}>
                                Sign out
                                </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>}
            </div>
        </nav>
    );
}

const mapStateToProps = ({ menu, settings, authUser: auth }) => {
    const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
    const { locale } = settings;
    return {
        containerClassnames,
        menuClickCount,
        selectedMenuHasSubItems,
        locale,
        auth
    };
};
export default injectIntl(
    connect(
        mapStateToProps,
        { setContainerClassnames, clickOnMobileMenu, logoutUser, changeLocale }
    )(TopNav)
);
