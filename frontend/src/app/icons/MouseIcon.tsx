import { SVGProps } from 'react'

export default function MouseIcon(props: SVGProps<SVGSVGElement>) {
	const { width = '25', height = '25', viewBox = '0 0 25 25', fill = 'none', xmlns = 'http://www.w3.org/2000/svg', ...rest } = props
	return (
		<svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<foreignObject x='-1' y='-2' width='27' height='27'>
				<div
					xmlns='http://www.w3.org/1999/xhtml'
					style={{
						backdropFilter: 'blur(2.5px)',
						clipPath: 'url(#bgblur_0_2020_8_clip_path)',
						height: '100%',
						width: '100%',
					}}
				></div>
			</foreignObject>
			<g filter='url(#filter0_dd_2020_8)' data-figma-bg-blur-radius='5'>
				<path
					d='M19.9467 9.3102L6.46167 3.18494C6.14311 3.02227 5.78133 2.96484 5.4282 3.02089C5.07506 3.07694 4.7487 3.2436 4.49588 3.49697C4.24306 3.75034 4.07677 4.07742 4.02084 4.43133C3.96492 4.78523 4.02222 5.1478 4.18454 5.46707L10.2964 18.9817C10.4303 19.2892 10.6521 19.5501 10.9339 19.7313C11.2156 19.9125 11.5447 20.0059 11.8794 19.9997H12.091C12.4993 19.9606 12.8842 19.7911 13.189 19.5162C13.4938 19.2413 13.7024 18.8754 13.7841 18.4726L14.7406 13.7387L19.4642 12.7801C19.8661 12.6983 20.2311 12.4892 20.5055 12.1837C20.7798 11.8782 20.949 11.4924 20.9879 11.0833C21.0321 10.7143 20.9542 10.3409 20.7661 10.0206C20.578 9.70022 20.2901 9.45065 19.9467 9.3102Z'
					fill='#DFDFDF'
					fillOpacity='0.8'
					shapeRendering='crispEdges'
				/>
				<path
					d='M5.50684 3.51465C5.75533 3.47526 6.01009 3.51537 6.23438 3.62988L6.24414 3.63574L6.25488 3.64062L19.7402 9.76562L19.7578 9.77344C19.9993 9.87236 20.2023 10.0477 20.335 10.2734C20.4676 10.4993 20.5223 10.763 20.4912 11.0234L20.4902 11.0361C20.4614 11.3387 20.3364 11.6239 20.1338 11.8496C19.931 12.0754 19.6609 12.2297 19.3643 12.29L14.6416 13.249L14.3164 13.3145L14.251 13.6396L13.2939 18.373C13.2336 18.6708 13.0795 18.9414 12.8545 19.1445C12.6326 19.3447 12.353 19.4688 12.0566 19.5H11.8799H11.8789H11.8701C11.6345 19.5043 11.4026 19.4382 11.2041 19.3105C11.0553 19.2148 10.93 19.0876 10.8369 18.9385L10.7549 18.7822L10.752 18.7754L4.63965 5.26074L4.63574 5.25098L4.62988 5.24023C4.51553 5.01514 4.47528 4.75938 4.51465 4.50977C4.55411 4.26006 4.67155 4.02917 4.84961 3.85059C5.02784 3.67197 5.25823 3.55411 5.50684 3.51465Z'
					stroke='#E0E0E0'
					strokeOpacity='0.6'
					shapeRendering='crispEdges'
				/>
			</g>
			<defs>
				<filter
					id='filter0_dd_2020_8'
					x='-1'
					y='-2'
					width='27'
					height='27'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='1' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite in2='hardAlpha' operator='out' />
					<feColorMatrix type='matrix' values='0 0 0 0 0.0470588 0 0 0 0 0.0470588 0 0 0 0 0.0509804 0 0 0 0.05 0' />
					<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2020_8' />
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='1' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite in2='hardAlpha' operator='out' />
					<feColorMatrix type='matrix' values='0 0 0 0 0.0470588 0 0 0 0 0.0470588 0 0 0 0 0.0509804 0 0 0 0.1 0' />
					<feBlend mode='normal' in2='effect1_dropShadow_2020_8' result='effect2_dropShadow_2020_8' />
					<feBlend mode='normal' in='SourceGraphic' in2='effect2_dropShadow_2020_8' result='shape' />
				</filter>
				<clipPath id='bgblur_0_2020_8_clip_path' transform='translate(1 2)'>
					<path d='M19.9467 9.3102L6.46167 3.18494C6.14311 3.02227 5.78133 2.96484 5.4282 3.02089C5.07506 3.07694 4.7487 3.2436 4.49588 3.49697C4.24306 3.75034 4.07677 4.07742 4.02084 4.43133C3.96492 4.78523 4.02222 5.1478 4.18454 5.46707L10.2964 18.9817C10.4303 19.2892 10.6521 19.5501 10.9339 19.7313C11.2156 19.9125 11.5447 20.0059 11.8794 19.9997H12.091C12.4993 19.9606 12.8842 19.7911 13.189 19.5162C13.4938 19.2413 13.7024 18.8754 13.7841 18.4726L14.7406 13.7387L19.4642 12.7801C19.8661 12.6983 20.2311 12.4892 20.5055 12.1837C20.7798 11.8782 20.949 11.4924 20.9879 11.0833C21.0321 10.7143 20.9542 10.3409 20.7661 10.0206C20.578 9.70022 20.2901 9.45065 19.9467 9.3102Z' />
				</clipPath>
			</defs>
		</svg>
	)
}
