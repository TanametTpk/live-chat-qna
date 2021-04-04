import { Button, Input } from 'antd'
import Search from 'antd/lib/input/Search'
import React from 'react'
import EditableChoiceList from '../EditableChoiceList'
import { useFormik } from 'formik'
import IChoice from '../../interfaces/Choice'

interface Props {
    submit: (title: string, choices: IChoice[]) => void
}

interface QuestionForm {
    title: string
    choice: string
    choices: IChoice[]
}

const QuestionForm: React.FC<Props> = ({submit}) => {
    const formik = useFormik<QuestionForm>({
        initialValues: {
            title: '',
            choice: '',
            choices: []
        },
        onSubmit: values => {
            submit(values.title, values.choices)
            formik.resetForm()
        }
    })

    const removeChoiceHandler = (target: number) => {
        formik.setFieldValue('choices', 
            formik.values.choices.filter((_, index: number) => {
                return index !== target
            })
        )
    }

    return (
        <div className="grid grid-cols-1 gap-3">
            <Input
                placeholder="Enter Question"
                size="large"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
            />
            <Search
                placeholder="Enter Choice"
                enterButton="Add"
                size="large"
                name="choice"
                onChange={formik.handleChange}
                value={formik.values.choice}
                onSearch={(value: string) => {
                    let choice: IChoice = {
                        title: value,
                        percent: 50,
                        voteCount: 0
                    }

                    let isHaveSameTitle = formik.values.choices.some((choice) => {
                        return choice.title === value
                    })

                    if (!isHaveSameTitle)
                        formik.setFieldValue('choices', [
                            ...formik.values.choices,
                            choice
                        ])
                    formik.setFieldValue('choice', '')
                }}
                allowClear
            />
            <Button
                type="primary"
                onClick={() => formik.handleSubmit()}
            >
                Update
            </Button>
            <div>
                <h3
                    className="text-white text-xl"
                >
                    Previews
                </h3>

                <div>
                    <EditableChoiceList
                        removeHandler={removeChoiceHandler}
                        choices={formik.values.choices}
                    />
                </div>
            </div>
        </div>
    )
}

export default QuestionForm
