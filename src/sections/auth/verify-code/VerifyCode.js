import * as Yup from 'yup';
import { useEffect } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Input, Stack } from '@mui/material';
// ----------------------------------------------------------------------

export default function VerifyCode({digit,onChange}) {
  const VerifyCodeSchema = Yup.object().shape([...Array(digit)].reduce((a,_,i)=>({...a,[`code${i+1}`]:Yup.string().required('Code is required')}),{}))
  const defaultValues = [...Array(digit)].reduce((a,_,i)=>({...a,[`code${i+1}`]:''}),{})

  const {
    watch,
    control,
    setValue,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const values = watch();

  useEffect(() => {
    document.addEventListener('paste', handlePasteClipboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePasteClipboard = (event) => {
    let data = event?.clipboardData?.getData('Text') || '';
    data = data.split('');
    const code = [];
    [].forEach.call(document.querySelectorAll('#field-code'), (node, index) => {
      node.value = data[index];
      const fieldIndex = `code${index + 1}`;
      setValue(fieldIndex, data[index]);
      code.push(data[index])
    });
    onChange(code.join(''));
  };

  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;
    const fieldIndex = name.replace('code', '');

    const fieldIntIndex = Number(fieldIndex);
    if (value.length >= maxLength) {
      if (fieldIntIndex < digit) {
        const nextfield = document.querySelector(`input[name=code${fieldIntIndex + 1}]`);

        if (nextfield !== null) {
          nextfield.select();
        }
      }
    }
    handleChange(event);
    const code = [];
    [].forEach.call(document.querySelectorAll('#field-code'), (node) => {
      code.push(node.value)
    });
    onChange(code.join(''));
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      {Object.keys(values).map((name, index) => (
        <Controller
          key={name}
          name={`code${index + 1}`}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="field-code"
              autoFocus={index === 0}
              placeholder=""
              onChange={(event) => handleChangeWithNextField(event, field.onChange)}
              inputProps={{
                maxLength: 1,
                sx: {
                  p: 0,
                  textAlign: 'center',
                  width: { xs: 30, sm: 40 },
                  height: { xs: 30, sm: 40 },
                },
              }}
            />
          )}
        />
      ))}
    </Stack>
  );
}
