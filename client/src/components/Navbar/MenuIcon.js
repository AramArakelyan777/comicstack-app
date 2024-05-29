import "./Navbar.css"
import React from "react"
import genres from "../../assets/icons/Genres.svg"
import faq from "../../assets/icons/FAQ.svg"
import forum from "../../assets/icons/Forum.svg"
import user from "../../assets/icons/User.svg"

const MenuIcon = ({ name }) => {
    switch (name) {
        case "genres":
            return <img src={genres} alt="menu-icon" />
        case "faq":
            return <img src={faq} alt="menu-icon" />
        case "home":
            return (
                <svg
                    className="homeNavLink"
                    width="125"
                    height="125"
                    viewBox="0 0 125 125"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="62.5" cy="62.5" r="62.5" fill="#DB4947" />
                    <path
                        className="logoFill"
                        d="M105.761 76.8731L106.908 78.1458L107.546 79.4184L107.673 80.3093V81.582L107.418 82.982L103.977 82.0911L93.1449 79.4184L86.518 78.4003L80.5284 78.273L78.3619 78.4003L74.2838 79.2912L66.1276 81.3275H62.6868L60.3928 80.8184L53.8934 78.1458L51.0897 77.2549L48.7958 77.3821L46.1196 77.6367L44.5903 77.8912L37.1988 79.4184L28.9152 81.4548L25.4743 82.2184L19.6121 82.982L16.1712 83.4911L14.8968 83.6183V45.6922L15.0242 41.4923L15.4065 30.1654V27.2382L15.9163 27.7473L16.6809 29.4018L16.9358 31.9472V34.3653L16.6809 38.947V60.4554L16.8084 63.7644L16.5535 66.1825L16.4261 70.5096L16.5535 72.9277L16.9358 74.2004L17.4456 74.964L17.8279 75.6004L18.0828 76.1095L19.6121 76.2367L23.3078 75.8549L41.1494 73.1823L46.1196 72.4187H51.3446L55.0404 72.9277L57.9715 74.0732L61.5398 76.4913L62.8142 76.8731L64.4709 76.7458L70.7155 74.7095L72.4996 74.3277L75.5582 73.9459L76.8326 73.6913L84.8613 73.5641L94.5468 73.9459L101.429 74.964L105.761 76.8731Z"
                        fill="black"
                    />
                    <path
                        d="M66.1277 33.7627L66.3825 68.7278L67.9118 68.3335C68.8524 68.2427 69.3857 68.1848 70.3332 68.0706L75.9405 66.8876L77.9796 66.7561L82.6949 66.8876L89.3217 67.1504H95.5663L99.6444 66.7561L103.722 65.836L105.507 64.9158V47.4333L105.124 39.1521L104.997 27.1903H102.958L99.8993 27.0589L95.9486 26.5331L86.0083 25.0872L81.6753 24.6928L77.9796 24.8243L74.4113 25.35L71.0978 26.5331L68.2941 28.5048L67.4021 29.4249L66.7649 30.608L66.2551 32.1853L66.1277 33.7627Z"
                        fill="#DB4947"
                    />
                    <path
                        className="logoFill"
                        d="M67.5427 49.486V51.5238L70.9436 50.7087L72.9161 50.437L75.8408 50.1653L80.8061 49.7577H86.0435L97.8786 50.1653H104.204V30.9421L104 30.3987L103.456 29.6515L102.912 29.1081L101.143 28.4288L98.0827 27.9533H95.43L87.6079 26.7986L81.5543 25.9155H77.8134L76.2489 26.1193L73.0521 26.7986L70.9436 27.8854L69.1751 29.1081L68.0868 30.6704L67.5427 32.3685L67.0665 35.0856L66.8625 39.365L67.0665 42.8971L67.5427 49.486Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        d="M70.3314 52.6106L71.8958 51.9314L74.0044 51.6597L77.7453 51.4559L85.4314 51.7955L96.1782 52.4748L104.136 52.6786V65.0412H94.5457L91.4849 65.177L67.5427 66.6714L67.2026 58.8599L67.4066 56.4824L67.8147 55.056L68.2909 54.3088L69.1071 53.4937L69.4472 53.0861L70.3314 52.6106Z"
                        fill="black"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M89.026 35.8125C88.8963 35.9857 88.8717 36.2191 88.8527 36.433C88.7251 37.8745 90.2187 38.4922 91.4703 39.0098L91.6023 39.0644C91.854 39.1689 92.1114 39.2483 92.3692 39.3279C92.4884 39.3647 92.6077 39.4015 92.7266 39.4409C92.7994 39.4409 92.865 39.4187 92.9379 39.3941C93.0288 39.3633 93.131 39.3287 93.2725 39.3287C93.3548 39.3493 93.4372 39.3673 93.5186 39.3851C93.9412 39.4776 94.3361 39.5641 94.5469 39.9651C94.7368 40.3264 94.6035 41.323 94.5508 41.7175L94.5468 41.7469C94.4559 42.4295 94.2901 43.0986 94.1246 43.7667C94.0392 44.1114 93.9538 44.4558 93.8789 44.8016C93.6733 44.727 93.3662 44.8032 93.6548 45.0936C94.1298 45.5717 94.9027 45.8794 95.6034 46.1584C95.8217 46.2454 96.0332 46.3296 96.2263 46.4152C96.3289 46.4607 96.4431 46.5212 96.5623 46.5843C96.8245 46.7232 97.1111 46.875 97.3535 46.9091C97.3958 46.9151 97.4311 46.9207 97.4618 46.9257C97.5958 46.9472 97.6411 46.9545 97.7969 46.9091C98.1541 46.9091 98.1708 46.9091 98.4437 46.8298L99.8618 46.9091C100.646 46.499 100.571 46.0536 100.466 45.4272C100.446 45.3101 100.426 45.1866 100.409 45.0558C100.282 44.0377 100.234 43.5696 100.234 42.947V41.7469C100.234 41.4593 100.262 41.3559 100.409 41.1105C100.432 41.0728 100.463 41.0351 100.496 40.9958C100.574 40.9023 100.66 40.7997 100.651 40.6658C100.716 40.6553 100.78 40.6434 100.844 40.6316C101.17 40.571 101.49 40.5119 101.819 40.6458C101.879 40.6257 101.943 40.6143 102.007 40.6028C102.114 40.5835 102.222 40.5642 102.309 40.5034C102.693 40.2337 102.461 39.7477 102.234 39.2721C102.087 38.962 101.941 38.6563 101.969 38.4178C101.8 38.0653 101.955 37.8956 102.125 37.7088C102.239 37.5841 102.36 37.4518 102.395 37.2525C102.437 37.02 102.307 36.7307 102.193 36.5288C101.76 36.3935 101.396 36.3606 101.079 36.7141L101.061 36.6463C100.989 36.3804 100.886 36.0023 100.664 35.8125C100.557 35.7209 100.473 35.7027 100.376 35.6816C100.316 35.6686 100.251 35.6544 100.171 35.6212C99.995 35.5473 99.8163 35.4741 99.6368 35.4005C99.0672 35.1672 98.489 34.9303 97.9499 34.6555C96.3386 33.8341 94.6412 33.1341 92.9491 32.4362C91.9802 32.0366 91.0131 31.6378 90.0648 31.2172C89.7868 31.094 89.5041 30.9756 89.2209 30.8571C88.7414 30.6564 88.2607 30.4552 87.7993 30.2285C87.5844 30.1229 87.4174 30.0719 87.2055 30.0072C87.1145 29.9794 87.0153 29.9491 86.9005 29.9109C86.674 30.1654 86.5103 30.3508 86.383 30.495C85.9376 30.9997 85.9376 30.9997 85.2437 31.6926C85.3282 31.8745 85.6664 32.2893 85.8114 32.4218C86.065 32.6536 86.3747 32.7436 86.6861 32.8341C86.9841 32.9206 87.2837 33.0077 87.5377 33.2198C87.9594 33.5721 88.667 34.4255 88.9395 34.8743C89.026 35.0168 89.0041 35.1911 88.9828 35.3606C88.9619 35.5276 88.9415 35.6899 89.026 35.8125ZM89.4673 37.1655C89.5323 37.5792 90.1765 38.3202 90.5962 38.056C91.0084 37.8747 91.5114 37.5915 91.8215 37.2505C91.954 37.1048 91.9981 37.0379 92.1256 36.7833C92.1256 36.7535 92.1262 36.7207 92.1268 36.6858C92.1317 36.4225 92.1388 36.0343 91.9088 35.8287C91.7998 35.7313 91.637 35.6944 91.4842 35.6597C91.4247 35.6462 91.3668 35.633 91.314 35.6168C89.9981 35.2117 89.261 36.0633 89.4673 37.1655ZM91.848 38.0521C92.154 37.758 92.3908 37.5304 92.6476 37.1221C92.6976 37.1047 92.7524 37.0833 92.8098 37.0608C93.0315 36.9741 93.292 36.8722 93.4595 36.9327C93.6195 36.9904 93.6635 37.234 93.689 37.3753C93.6908 37.3853 93.6926 37.3948 93.6942 37.4037C93.7894 37.9146 93.561 38.3838 93.0759 38.6055C92.6873 38.7831 92.2539 38.7357 91.8195 38.6264C91.6907 38.5941 91.6432 38.5777 91.5149 38.5334C91.4494 38.5107 91.3628 38.4808 91.2335 38.4378L90.8511 38.3105C90.7664 38.2466 90.7377 38.2131 90.6982 38.1668C90.6737 38.1381 90.6449 38.1046 90.5962 38.056C90.6819 38.0639 90.7817 38.079 90.8875 38.0951C91.2116 38.1443 91.5935 38.2024 91.8106 38.0881C91.8232 38.076 91.8356 38.064 91.848 38.0521Z"
                        fill="#DB4947"
                    />
                    <path
                        d="M69.7408 33.9671L70.0644 34.2433L70.3511 34.303C71.8685 34.5602 73.8023 34.4716 73.932 34.306C74.0617 34.1405 74.0966 33.9279 74.3237 33.7152C75.5143 32.6396 75.5661 31.8161 75.3735 30.4926L75.2025 30.3003L75.0131 29.9999L75.092 29.6508L75.3235 29.3857L75.5734 29.2289L75.976 29.1561L76.4337 29.4079L76.6232 29.7084L76.4653 30.4065C76.6416 31.4449 77.2406 31.9198 78.7859 32.6645L78.9385 32.7485C80.5403 33.1681 81.37 33.0036 82.6954 32.0684L82.677 31.9602L82.8901 31.5868L83.14 31.43L83.5241 31.2489L83.9451 31.2843L84.4029 31.5362L84.4581 31.8609L84.3792 32.21L83.8793 32.5236L83.4768 32.5965L83.2269 32.7533C82.0274 33.6888 81.4205 35.3426 81.4205 35.3426L81.5479 36.8698C81.5479 36.8698 82.2843 37.4578 83.9584 37.8655L84.3978 38.0091L84.532 37.9848L84.9529 38.0202L85.2397 38.0799L85.5817 38.4643L85.4355 38.7807C85.3971 39.074 85.3285 39.1729 85.0213 39.2353L84.4846 39.3324L83.5691 38.8286C81.8949 38.2913 81.0878 38.3243 80.0805 39.4602L79.8489 39.7252C78.7557 40.6632 78.5282 41.2946 78.5283 42.5308L78.8703 42.9152L78.9256 43.24L78.7309 43.7216L78.0784 43.9513L77.6575 43.9159L77.3339 43.6397L77.2418 43.0984L77.4549 42.7251C77.3082 41.5967 77.7053 42.0318 75.9172 40.7577C75.2219 40.2623 74.7461 39.9767 74.4698 39.8282C73.1346 39.3932 72.6372 39.9408 71.3589 41.0389L71.1274 41.304L70.9143 41.6773L70.5302 41.8585L69.9751 41.8474L69.6883 41.7877L69.4989 41.4872L69.4621 41.2707L69.541 40.9217L69.7725 40.6566L70.175 40.5837L70.5591 40.4026L70.6749 40.2701C71.8487 39.5239 73.2935 38.9553 72.9672 37.5011L72.735 36.861C72.3866 35.4979 71.2715 35.4213 69.8276 35.2904L69.5224 35.1225L69.2541 35.1711L68.8331 35.1357L68.5463 35.076L68.3569 34.7755L68.3017 34.4508L68.5147 34.0775L68.8989 33.8963L69.1672 33.8478L69.7408 33.9671Z"
                        fill="#DB4947"
                    />
                    <path
                        d="M93.2724 59.9209C92.6073 59.5117 92.293 59.2285 91.8706 58.6064L98.6249 58.8693L104.232 59.1322V60.0523L103.213 60.3152C101.937 60.5603 101.213 60.6809 99.8993 60.841L97.7328 60.9725L95.9486 60.841L94.5468 60.4467C94.0107 60.2978 93.7298 60.1854 93.2724 59.9209Z"
                        fill="#DB4947"
                    />
                    <path
                        d="M76.7052 60.9724L76.068 59.1322L86.773 57.8177V60.9724H76.7052Z"
                        fill="#DB4947"
                    />
                    <path
                        className="logoFill"
                        d="M65.0296 95.3923H62.9771C62.9771 96.7148 62.6808 98.2705 63.8479 99.338C65.7762 101.101 69.0893 100.111 69.5632 97.9093C70.4201 93.9294 66.3834 92.6625 65.1971 89.3093C64.9303 88.5557 65.5252 86.3006 66.9404 87.3173C67.6352 87.8165 67.4866 89.2347 67.5951 89.9386H69.6476C69.6476 88.5865 69.9495 86.933 68.7142 85.8553C66.945 84.3123 63.5731 85.1885 63.0654 87.2118C62.0751 91.159 66.1777 92.4469 67.2909 95.7761C67.5282 96.4857 67.1898 99.1159 65.6735 98.0054C64.8477 97.4005 65.0303 96.2036 65.0296 95.3923Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        d="M21.6717 96.2313H19.6193C19.5421 98.1793 17.3629 98.673 17.3116 96.441C17.2531 93.9007 16.8613 90.9792 17.3483 88.4713C17.6595 86.8694 19.3086 87.4517 19.6193 88.68L21.4152 88.8898C22.7526 85.1543 15.7779 84.0633 15.0562 87.841C14.6088 90.1829 15.0013 92.8122 15.0013 95.1825C15.0013 96.3458 14.7855 97.6975 15.5375 98.7452C17.9981 102.174 21.6715 98.87 21.6717 96.2313Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        d="M33.9865 85.324V96.6508C33.9865 98.3679 33.3644 100.191 36.039 100.217L36.2955 88.6801H36.5521C37.1819 91.4444 37.753 94.2747 38.1117 97.0703C38.2007 97.7644 38.3508 99.7623 39.199 100.089C40.8971 100.743 41.1385 98.7687 41.315 97.9093C41.9166 94.9776 42.8905 91.8621 42.966 88.8898H43.4791V97.6996C43.4791 98.4383 43.1319 100.417 44.7287 100.113C46.0569 99.8607 45.5315 97.4699 45.5315 96.6508V85.324H41.4266L40.1438 93.2947C38.3682 91.7469 38.4354 87.4127 38.0914 85.324H33.9865Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        d="M48.3535 85.324V100.007H50.6625V85.324H48.3535Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        d="M57.8461 88.68H60.1551C59.9155 86.2836 56.1488 83.6056 54.0337 86.5917C53.3757 87.5205 53.4847 88.6983 53.4847 89.7288C53.4844 92.2713 52.5195 96.4297 53.9386 98.7393C55.5649 101.387 60.7968 99.7449 60.0507 96.8916C59.887 96.2663 58.8513 96.0706 58.2574 96.4471C57.5411 96.9008 56.3669 99.6125 55.6382 97.0693C54.9876 94.7984 55.0479 90.7554 55.6254 88.4711C56.0431 86.8191 57.5847 87.2837 57.8461 88.68Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        d="M71.6999 85.324V87.002L74.7714 87.5126L75.0351 90.9874V100.007L77.3441 100.217V87.2118C79.4394 87.1736 80.4146 87.2407 80.4228 85.324H71.6999Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        d="M81.4492 100.217L84.0147 85.324H87.3499L90.1721 100.217H88.1196C88.0559 99.5562 87.9201 98.9052 87.784 98.2528C87.7601 98.1384 87.7362 98.0239 87.7127 97.9093C87.5326 97.0313 86.4284 93.1919 84.534 95.459C83.9742 96.1289 83.9334 96.9687 83.8952 97.7555C83.8325 99.046 83.7768 100.194 81.4492 100.217Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        d="M99.9211 96.2313H97.6121C97.5769 98.6609 95.3782 98.2221 95.3069 96.0215C95.2302 93.6618 94.9529 91.0178 95.3515 88.6803C95.6263 87.0691 97.3201 87.1518 97.6121 88.6801H99.9211C99.8438 85.9847 95.6548 83.7865 93.6542 86.7962C92.0933 89.1441 93.2075 94.208 93.2516 96.8606C93.2911 99.2432 96.3057 101.371 98.8399 99.3304C99.918 98.4623 99.92 97.3824 99.9211 96.2313Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        d="M102.743 85.324V96.6508C102.743 98.3679 102.121 100.191 104.796 100.217C104.796 97.5586 104.186 94.3454 105.309 91.8264L108.131 100.007H110.44L108.378 93.7142L107.182 89.7288L109.157 85.324C105.947 85.3242 106.721 86.6897 104.796 88.2605V85.324H102.743Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24.5711 87.8411C24.7719 86.7426 25.4657 85.8415 26.8031 85.4715C28.5543 84.9869 30.4451 85.776 30.9967 87.2118C31.3169 88.0449 31.2588 89.043 31.2042 89.9821C31.184 90.329 31.1643 90.6679 31.1643 90.9874C31.1643 91.6661 31.2045 92.3762 31.2453 93.0973C31.3373 94.7234 31.4325 96.4053 31.077 97.9094C30.8418 98.904 30.0616 99.7462 28.8542 100.047C27.2957 100.436 25.4385 99.7999 24.8592 98.5376C23.6269 95.8517 24.0546 90.6671 24.5711 87.8411ZM27.8291 87.2117L27.0594 87.9458L26.5463 90.2532L26.6746 96.6507L27.316 97.9093L28.2139 98.119L28.7271 97.0702L29.2402 92.2458L28.7271 87.9458L27.8291 87.2117Z"
                        fill="black"
                    />
                    <path
                        d="M39.3652 26.22L23.5627 28.7654V68.7278L29.9347 67.5824L37.4536 66.6915L41.2768 66.1824L43.9531 65.9279L45.9921 65.6734H49.3055L53.1287 66.0552L55.0403 66.5643L58.8635 67.8369L60.6477 68.7278V43.5286L60.5203 38.3106V36.7833L60.6477 35.1289L60.7751 33.6016V31.9471L60.6477 30.0381L60.2654 28.3836L59.3733 26.9836L57.5891 25.8382L56.0599 25.3292L53.6385 24.8201L51.7269 24.6928H50.4525L47.1391 24.9473L39.3652 26.22Z"
                        fill="#DB4947"
                    />
                    <path
                        className="logoFill"
                        d="M24.7096 32.0416L24.5822 31.03L25.3468 30.9036H26.3663L27.6407 31.03L28.7877 31.2829L29.8072 31.7887L30.9542 32.4209L32.7383 33.8119L31.0816 29.892L32.356 29.7655L33.3755 29.6391L34.6499 29.7655L35.7969 30.0184L36.9439 30.5242L37.8359 31.4094L38.2183 32.0416L38.728 32.8003H39.3652L38.2183 28.754L44.5903 27.4895L45.2275 32.8003H45.8647L46.5019 30.2713L47.0116 29.1333L47.9037 27.9953L49.433 27.2366L50.7074 26.9837L53.0013 27.1101L55.2952 27.4895L51.2171 34.4441L57.5891 28.754H58.2263L58.8635 30.3978V31.5358L58.4812 32.9267L57.9714 33.9383L57.0794 35.2028L54.1482 38.1111L58.7361 35.7086L58.991 36.5937L59.2458 37.7317V38.6169L59.1184 39.3756L58.8635 39.8813L58.4812 40.5136L57.7166 41.2723L56.5696 41.7781L55.2952 42.1574V42.7896L56.3147 42.9161L57.4617 43.2954L58.2263 43.9277L58.7361 44.6864L59.2458 45.8244L59.5007 47.5947L59.3733 50.6294L58.8635 53.917L54.658 52.1468L55.4226 52.9055L56.4422 54.1699L57.0794 55.0551L58.2263 57.0782L58.6086 58.4692L58.991 60.2394L59.3733 65.5502L58.7361 66.1825L55.2952 65.0444L55.1678 63.1477L54.7854 61.251L54.0208 59.1014L53.1287 57.4576L51.8543 55.9402L50.9622 54.9286L49.3055 53.917L49.433 53.7906L51.0897 51.1352L52.1092 48.7327L52.2366 47.4682V46.3302L51.9818 45.5715L51.472 43.9277L50.4525 42.5368L49.3055 41.7781L47.9037 41.2723L45.6098 41.5252L44.0805 42.1574L42.8061 43.2954L41.914 44.307L41.1494 45.5715L40.6396 45.3186L39.875 44.5599L39.2378 43.2954L38.8555 42.1574L38.4731 40.1342L38.3457 38.9962L38.2183 38.1111H38.0908L24.5822 47.3418V36.3408L29.2975 37.9846L27.7682 36.7202L25.7291 34.4441L25.0919 33.3061L24.7096 32.0416Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        d="M49.433 42.765L48.286 42.2559H47.3939L46.1195 42.765L43.6982 44.5467L43.3159 45.5649L43.1884 47.2194L43.6982 48.7466L44.3354 49.5102L45.1 50.4011L46.247 51.292L47.3939 51.6738H48.5409L49.6879 50.9102L50.3251 50.0193L51.2171 48.2375L50.9623 46.074L50.7074 44.8013L49.9427 43.5286L49.433 42.765Z"
                        fill="black"
                    />
                    <path
                        className="logoFill"
                        d="M41.6592 52.4374L24.5822 47.0921V51.8011L29.9347 51.1647V51.8011L28.5329 52.1829L27.0036 52.8192L25.9841 53.5828L25.3469 54.7282L24.8371 56.0009L24.7097 57.2736L24.5822 60.5826L31.5914 56.0009L29.9347 57.7827L26.8761 60.9644L25.3469 63.5098L24.5822 65.9279L28.1505 65.6734L30.4445 64.9097L32.1012 64.2734L34.0128 62.8734L36.689 60.4553L38.8555 57.2736L41.6592 52.4374Z"
                        fill="black"
                    />
                    <path
                        d="M49.1781 47.7285L50.7074 44.8013L50.9623 46.074L51.0897 47.2194L49.1781 47.7285Z"
                        fill="#DB4947"
                    />
                    <path
                        d="M47.2665 47.7285L45.7372 44.8013L45.2275 45.8194L44.9726 47.2194L47.2665 47.7285Z"
                        fill="#DB4947"
                    />
                </svg>
            )

        case "forum":
            return <img src={forum} alt="menu-icon" />
        case "user":
            return <img src={user} alt="menu-icon" />
        default:
            return null
    }
}

export default MenuIcon
