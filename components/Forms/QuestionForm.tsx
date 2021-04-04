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
        <div>
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
                    formik.setFieldValue('choices', [
                        ...formik.values.choices,
                        choice
                    ])
                    formik.setFieldValue('choice', '')
                }}
                allowClear
            />
            <EditableChoiceList
                removeHandler={removeChoiceHandler}
                choices={formik.values.choices}
            />
            <Button
                onClick={() => formik.handleSubmit()}
            >
                Update
            </Button>
        </div>
    )
}

export default QuestionForm
