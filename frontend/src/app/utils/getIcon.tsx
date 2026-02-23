import ArtTherapyColorIcon from '../icons/our mission and targets/ArtTherapyColorIcon'
import CommunityIntegrationColorIcon from '../icons/our mission and targets/CommunityIntegrationColorIcon'
import CommunityResponsebilityColorIcon from '../icons/our mission and targets/CommunityResponsebilityColorIcon'
import CulturalDevelopmentColorIcon from '../icons/our mission and targets/CulturalDevelopmentColorIcon'
import ArtistSupportIcon from '../icons/ourActions/ArtistSupportIcon'
import ArtTherapyIcon from '../icons/ourActions/ArtTherapyIcon'
import CharityIcon from '../icons/ourActions/CharityIcon'
import CrossIcon from '../icons/ourActions/CrossIcon'
import CulturalDevelopmentIcon from '../icons/ourActions/CulturalDevelopmentIcon'
import BuildCommunityIcon from '../icons/profitByHelping/BuildCommunityIcon'
import DevelopYourselfIcon from '../icons/profitByHelping/DevelopYourselfIcon'
import ExpressYourselfIcon from '../icons/profitByHelping/ExpressYourselfIcon'
import FullfillYourselfIcon from '../icons/profitByHelping/FullfillYourselfIcon'
import GetExperienceIcon from '../icons/profitByHelping/GetExperienceIcon'
import GrowSpirituallyIcon from '../icons/profitByHelping/GrowSpirituallyIcon'
import CharityBallIcon from '../icons/whatWeDo/CharityBallIcon'
import GospelIcon from '../icons/whatWeDo/GospelIcon'
import InvicibleGroupIcon from '../icons/whatWeDo/InvicibleGroupIcon'
import TheatreIcon from '../icons/whatWeDo/TheatreIcon'

export function getIcon(name: string) {
	switch (name) {
		case 'THEATHRE_ICON':
			return <TheatreIcon />
		case 'INVICIBLE-GROUP_ICON':
			return <InvicibleGroupIcon />
		case 'GOSPEL_ICON':
			return <GospelIcon />
		case 'CHARITY-BALL_ICON':
			return <CharityBallIcon />
		case 'ARTIST-SUPPORT_ICON':
			return <ArtistSupportIcon />
		case 'ARTTHERAPY_ICON':
			return <ArtTherapyIcon />
		case 'SPIRITUAL-DEVELOPMENT_ICON':
			return <CrossIcon />
		case 'CHARITY_ICON':
			return <CharityIcon />
		case 'CULTURAL-DEVELOPMENT_ICON':
			return <CulturalDevelopmentIcon />

		case 'COMMUNITY_INTEGRATION_COLOR_ICON':
			return <CommunityIntegrationColorIcon />
		case 'CULTURAL_DEVELOPMENT_COLOR_ICON':
			return <CulturalDevelopmentColorIcon />
		case 'ARTTHERAPY_COLOR_ICON':
			return <ArtTherapyColorIcon />
		case 'COMMUNITY-RESPONSEBILITY_COLOR_ICON':
			return <CommunityResponsebilityColorIcon />

		case 'DEVELOP_YOURSELF':
			return <DevelopYourselfIcon />
		case 'BUILD_COMMUNITY':
			return <BuildCommunityIcon />
		case 'EXPRESS_YOURSELF':
			return <ExpressYourselfIcon />
		case 'FULFILL_YOURSELF':
			return <FullfillYourselfIcon />
		case 'GROW_SPIRITUALLY':
			return <GrowSpirituallyIcon />
		case 'GET_EXPERIENCE':
			return <GetExperienceIcon />
		default:
			return null
	}
}
