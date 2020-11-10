import React from "react"
import { Control, Controller, DeepMap, FieldError } from "react-hook-form"
import { Input } from "react-native-elements"
import Transition from "../../../components/Transition"
import { DividerBlock } from "../../../styles"
import { ItemBlock, PetItems } from "."

export default function PetName({ control, errors, openItem }: {
    control: Control<Record<string, any>>
    errors: DeepMap<Record<string, any>, FieldError>
    openItem: PetItems
}) {
    return (
        <ItemBlock display={openItem === 'PetName'}>
            <Transition>
                <Controller
                    control={control}
                    render={({ value, onChange }) => (
                        <Input
                            maxLength={16}
                            containerStyle={{
                                paddingHorizontal: 0,
                                
                            }}
                            placeholder="예) 바오, 순철이, 나옹이"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.petName ? '최대 16글자로 이름을 적어주세요' : ''}
                        />
                    )}
                    name="petName"
                    rules={{ required: true, minLength: 1, maxLength: 16, }}
                    defaultValue=""
                />
            </Transition>
            <DividerBlock marginBottom={8} />
        </ItemBlock>
    )
}
