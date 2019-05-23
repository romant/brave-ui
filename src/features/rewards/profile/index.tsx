/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import {
  StyledWrapper,
  StyledContent,
  StyledImageWrapper,
  StyledImage,
  StyledVerified,
  StyledTitleWrap,
  StyledTitle,
  StyledProvider,
  StyledProviderWrap,
  StyledProviderWrapRefreshing,
  StyledProviderWrapRefreshFinished,
  StyledInlineVerified,
  StyledVerifiedText,
  StyledInlineUnVerified,
  StyledVerifiedCheckLink,
  StyledVerifiedCheckNoLink,
  StyledRefreshCheckOverlayFinished,
  StyledRefresh,
  StyledRefreshLoaderFinished,
  StyledRefreshOverlay,
  StyledRefreshOverlayFinished,
  StyledRefreshFinished,
  StyledVerifiedDivider
} from './style'
import { getLocale } from '../../../helpers'
import { VerifiedSIcon, UnVerifiedSIcon, LoaderIcon, CheckmarkCircleS } from '../../../components/icons'

export type Provider = 'twitter' | 'youtube' | 'twitch'

export interface Props {
  id?: string
  src?: string
  title: string
  type?: 'big' | 'small'
  provider?: Provider
  verified?: boolean
  tableCell?: boolean
  showUnVerifiedHelpIcon?: boolean
  refreshingPublisher?: boolean
  publisherRefreshed?: boolean
  onRefreshPublisher?: () => void
}

/*
  TODO
  - add fallback image
 */
export default class Profile extends React.PureComponent<Props, {}> {
  static defaultProps = {
    type: 'small'
  }

  getProviderName (provider: Provider) {
    switch (provider) {
      case 'youtube':
        return `${getLocale('on')} YouTube`
      case 'twitter':
        return `${getLocale('on')} Twitter`
      case 'twitch':
        return `${getLocale('on')} Twitch`
    }
  }

  getSrc (src?: string) {
    return src ? src : ''
  }

  render () {
    const {
      id,
      type,
      provider,
      src,
      title,
      verified,
      showUnVerifiedHelpIcon,
      onRefreshPublisher,
      refreshingPublisher,
      publisherRefreshed
    } = this.props

    return (
      <StyledWrapper id={id}>
        <StyledImageWrapper type={type}>
          <StyledImage src={this.getSrc(src)} />
          {verified && type === 'small' ? (
            <StyledVerified>
              <VerifiedSIcon />
            </StyledVerified>
          ) : null}
        </StyledImageWrapper>
        <StyledContent>
          <StyledTitleWrap>
            <StyledTitle type={type}>{title}</StyledTitle>
            {provider ? (
              <StyledProvider type={type}>
                {this.getProviderName(provider)}
              </StyledProvider>
            ) : null}
          </StyledTitleWrap>
          {verified && type === 'big' ? (
            !refreshingPublisher && !publisherRefreshed ?
            <StyledProviderWrap>
              <StyledInlineVerified>
                <VerifiedSIcon />
              </StyledInlineVerified>{' '}
              <StyledVerifiedText>
                {getLocale('verifiedPublisher')}
              </StyledVerifiedText>
            </StyledProviderWrap>
            : !publisherRefreshed && refreshingPublisher ?
            <>
              <StyledProviderWrapRefreshing>
                <StyledInlineVerified>
                  <VerifiedSIcon />
                </StyledInlineVerified>{' '}
                <StyledVerifiedText>
                  {getLocale('verifiedPublisher')}
                </StyledVerifiedText>
              </StyledProviderWrapRefreshing>
              <StyledRefreshOverlay>
                <StyledRefresh>
                  <LoaderIcon />
                </StyledRefresh>
              </StyledRefreshOverlay>
            </>
            :
            <>
              <StyledProviderWrapRefreshFinished>
                <StyledInlineVerified>
                  <VerifiedSIcon />
                </StyledInlineVerified>{' '}
                <StyledVerifiedText>
                  {getLocale('verifiedPublisher')}
                </StyledVerifiedText>
              </StyledProviderWrapRefreshFinished>
              <StyledRefreshOverlayFinished>
                <StyledRefreshLoaderFinished>
                  <LoaderIcon />
                </StyledRefreshLoaderFinished>
              </StyledRefreshOverlayFinished>
              <StyledRefreshCheckOverlayFinished>
                <StyledRefreshFinished>
                  <CheckmarkCircleS />
                </StyledRefreshFinished>
              </StyledRefreshCheckOverlayFinished>
            </>
          ) : showUnVerifiedHelpIcon ? (
            !publisherRefreshed && !refreshingPublisher ?
            <StyledProviderWrap>
              <StyledInlineUnVerified>
                <UnVerifiedSIcon />
              </StyledInlineUnVerified>{' '}
              <StyledVerifiedText>
                {getLocale('unVerifiedPublisher')}
              </StyledVerifiedText>
              <StyledVerifiedDivider />
              <StyledVerifiedCheckLink onClick={onRefreshPublisher}>
                {getLocale('unVerifiedCheck')}
              </StyledVerifiedCheckLink>
            </StyledProviderWrap>
            : !publisherRefreshed && refreshingPublisher ?
            <>
              <StyledProviderWrapRefreshing>
                <StyledInlineUnVerified>
                  <UnVerifiedSIcon />
                </StyledInlineUnVerified>{' '}
                <StyledVerifiedText>
                  {getLocale('unVerifiedPublisher')}
                </StyledVerifiedText>
                <StyledVerifiedDivider />
                <StyledVerifiedCheckLink>
                  {getLocale('unVerifiedCheck')}
                </StyledVerifiedCheckLink>
              </StyledProviderWrapRefreshing>
              <StyledRefreshOverlay>
                <StyledRefresh>
                  <LoaderIcon />
                </StyledRefresh>
              </StyledRefreshOverlay>
            </>
            :
            <>
              <StyledProviderWrapRefreshFinished>
                <StyledInlineUnVerified>
                  <UnVerifiedSIcon />
                </StyledInlineUnVerified>{' '}
                <StyledVerifiedText>
                  {getLocale('unVerifiedPublisher')}
                </StyledVerifiedText>
                <StyledVerifiedDivider />
                <StyledVerifiedCheckNoLink>
                  {getLocale('unVerifiedCheck')}
                </StyledVerifiedCheckNoLink>
              </StyledProviderWrapRefreshFinished>
              <StyledRefreshOverlayFinished>
                <StyledRefreshLoaderFinished>
                  <LoaderIcon />
                </StyledRefreshLoaderFinished>
              </StyledRefreshOverlayFinished>
              <StyledRefreshCheckOverlayFinished>
                <StyledRefreshFinished>
                  <CheckmarkCircleS />
                </StyledRefreshFinished>
              </StyledRefreshCheckOverlayFinished>
            </>
          ) : null}
        </StyledContent>
      </StyledWrapper>
    )
  }
}
