import { SubmitHandler, useForm } from 'react-hook-form';
import { IForm } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../store/formsSlice';
import { userSchema } from '../validations/userValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { convert2base64 } from '../services/convert2base64';

const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IForm>({
    mode: 'onBlur',
    resolver: yupResolver(userSchema),
  });
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const navigate = useNavigate();

  const submit: SubmitHandler<IForm> = async (data) => {
    console.log(data);
    if (data.image) {
      const converted = await convert2base64(data.image[0] as File);
      data.image = converted;
    }
    dispatch(setFormData(data));
    navigate(`/`);
    reset();
  };

  return (
    <div className="form-wrapper">
      <p className="title">Controlled Form</p>
      <form onSubmit={handleSubmit(submit)} className="form">
        <div className="name">
          <label htmlFor="name">Name</label>
          <input {...register('name')} />
          <p className="error">{errors.name?.message}</p>
        </div>
        <div className="age">
          <label htmlFor="age">Age</label>
          <input type="number" {...register('age')} />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email')} />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input type="password" {...register('password')} />
          <p className="error">{errors.password?.message}</p>
        </div>
        <div className="confirmedPassword">
          <label htmlFor="confirmedPassword">Confirm password</label>
          <input type="password" {...register('confirmedPassword')} />
          <p className="error">{errors.confirmedPassword?.message}</p>
        </div>
        <div className="gender">
          <label htmlFor="gender">Gender</label>
          <select name="gender" {...register('gender')}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="termsAndConditions">
          <label htmlFor="termsAndConditions">Accept the T&C</label>
          <input type="checkbox" {...register('termsAndConditions')} />
          <p className="error">{errors.termsAndConditions?.message}</p>
        </div>
        <div className="upload-image">
          <label htmlFor="image">Upload image</label>
          <input type="file" name="image" {...register('image')} />
          <p className="error">{errors.image?.message}</p>
        </div>
        <div className="countries">
          <label htmlFor="country">Choose the country</label>
          <select name="countries" {...register('country')}>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <button className="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export { ControlledForm };
