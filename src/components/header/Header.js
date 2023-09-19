import React, { useMemo, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import HeaderStyled, {
	HeaderActionsStyled,
	HeaderBodyStyled,
	HeaderNavStyled,
	NavItemStyled,
	NavLinkStyled
} from './Header.styled';
import {
	boolAttributesName,
	categoricalAttributesName,
	localStorageDefineTargetAudienceAttrKey,
	navigations,
	rangeAttributesName,
	routes
} from '../../constants';
import TargetAudienceIcon from '../icons/TargetAudienceIcon';
import useLocalStorage from '../../hooks/useLocalStorage';
import TooltipStyled from '../tooltip/tooltip.styled';
import TargetTooltip from '../targetTooltip/TargetTooltip';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedAttributes] = useLocalStorage(localStorageDefineTargetAudienceAttrKey);
	const navigate = useNavigate();

	const handleClose = () => {
		setAnchorEl(null);
	};

	const tooltipContent = useMemo(() => {
		if (selectedAttributes) {
			return <TargetTooltip
				title='Selected respondent attributes'
				rangeAttr={selectedAttributes[rangeAttributesName]}
				categoricalAttr={selectedAttributes[categoricalAttributesName]}
				booleanAttr={selectedAttributes[boolAttributesName]}
			/>
		}
	}, [selectedAttributes]);

	return (
		<HeaderStyled position='fixed'>
			<Container maxWidth='xl'>
				<HeaderBodyStyled>
					<HeaderNavStyled>
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							sx={{ mr: 2 }}
							onClick={(e) => setAnchorEl(e.currentTarget)}
						>
							<MenuIcon/>
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							open={!!anchorEl}
							onClose={handleClose}
						>
							{navigations.map(({ path, label }) => (
								<NavItemStyled key={path}>
									<NavLinkStyled onClick={handleClose} to={path}>
										{label}
									</NavLinkStyled>
								</NavItemStyled>
							))}
						</Menu>
					</HeaderNavStyled>

					<HeaderActionsStyled direction='row' spacing={2}>
						<TooltipStyled
							title={tooltipContent}
							arrow={true}
							disableFocusListener
							placement='left-start'
						>
							<IconButton
								size='large'
								edge='start'
								color='inherit'
								onClick={() => navigate(routes.targetAudience)}
							>
								<TargetAudienceIcon width={24} height={24}/>
							</IconButton>
						</TooltipStyled>
						<IconButton size='large' onClick={() => navigate(routes.buildSearchTermSet)}>
							<ShoppingCartIcon
								sx={{ color: (theme) => theme.palette.common.white }}
							/>
						</IconButton>
					</HeaderActionsStyled>
				</HeaderBodyStyled>
			</Container>
		</HeaderStyled>
	);
};

export default Header;