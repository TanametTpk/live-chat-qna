import { Button, Input } from 'antd'
import Search from 'antd/lib/input/Search'
import React from 'react'
import IQuestion from '../../interfaces/Question'
import EditableChoiceList from '../EditableChoiceList'
import { useFormik } from 'formik'
import IChoice from '../../interfaces/Choice'

interface Props {
    submit: (newQuestion: IQuestion) => void
}

const QuestionForm: React.FC<Props> = ({submit}) => {

    const formik = useFormik({
        initialValues: {
            name: '',
            choice: '',
            choices: []
        },
        onSubmit: values => {
            console.log(values);
        }
    })

    return (
        <div>
            <Input
                placeholder="Enter Question"
                size="large"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
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
                    console.log("test");
                    
                }}
                allowClear
            />
            <EditableChoiceList choices={formik.values.choices} />
            <Button
                onClick={() => formik.handleSubmit()}
            >
                Update
            </Button>
        </div>
    )
}

export default QuestionForm
