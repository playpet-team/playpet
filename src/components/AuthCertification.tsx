import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import IMP from "iamport-react-native";
import React from "react";
import useLoadingIndicator from "../hooks/useLoadingIndicator";
import { HomeNavigatorTabParamList } from "../navigation/BottomTabNavigator";

export default function AuthCertification() {
    const { Indicator } = useLoadingIndicator()
    const navigation = useNavigation()
    /* 가맹점 식별코드, 본인인증 데이터 추출 */
    const { params: { userCode, data } } = useRoute<RouteProp<HomeNavigatorTabParamList, 'AuthCertification'>>();

    /* 본인인증 후 실행될 콜백 함수 입력 */
    function callback(response: any) {
        console.log('response', response)
        const isSuccessed = getIsSuccessed(response)
        console.log('isSuccessed', isSuccessed)
        if (isSuccessed) {
            /* 본인인증 성공한 경우, 리디렉션 위해 홈으로 이동한다 */
            const params = {
                ...response,
                type: "certification", // 결제와 본인인증 구분을 위한 필드
            }
            navigation.navigate("Home", params)
        } else {
            /* 본인인증 실패한 경우, 이전 화면으로 돌아간다 */
            navigation.goBack()
        }
    }

    function getIsSuccessed(response: any) {
        const { success } = response

        if (typeof success === "string") return success === "true"
        if (typeof success === "boolean") return success === true
    }

    // return (
    //     <IMP.Certification
    //         userCode={userCode}
    //         data={{
    //             ...data,
    //             app_scheme: "test",
    //         }}
    //         callback={callback}
    //     />
    // )

    return (
        <IMP.Certification
            userCode='imp13797090'  // 가맹점 식별코드
            loading={<Indicator />} // 웹뷰 로딩 컴포넌트
            data={{
                merchant_uid: `mid_${new Date().getTime()}`,
                company: '아임포트',
                carrier: 'SKT',
                name: '홍길동',
                phone: '01012341234',
                min_age: '',
            }}           // 본인인증 데이터
            callback={callback}   // 본인인증 종료 후 콜백
        />
    );
}
