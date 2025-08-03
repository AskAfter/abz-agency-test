import React, { useState, useEffect, useCallback, memo } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { PhoneInput } from '../PhoneInput';
import { RadioButton } from '../RadioButton';
import { FormData } from '../../types';
import { fetchPositions, registerUser } from '../../services/api';

interface SignUpSectionProps {
  onUserRegistered?: () => void;
  id?: string;
}

function SignUpSectionComponent({ onUserRegistered, id }: SignUpSectionProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    position_id: 1,
    photo: null,
  });

  const [positions, setPositions] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    photo?: string;
  }>({});

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePositionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, position_id: parseInt(e.target.value) }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, photo: file }));
  }, []);

  // Load positions on component mount
  useEffect(() => {
    const loadPositions = async () => {
      try {
        const positionsData = await fetchPositions();
        setPositions(positionsData);
        if (positionsData.length > 0) {
          setFormData(prev => ({ ...prev, position_id: positionsData[0].id }));
        }
      } catch (error) {
        console.error('Failed to load positions:', error);
      }
    };

    loadPositions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setFieldErrors({});

    // Basic validation
    const errors: typeof fieldErrors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2 || formData.name.length > 60) {
      errors.name = 'Name must be between 2-60 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^\+38[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Phone must start with +38 and have 10 digits';
    }

    if (!formData.photo) {
      errors.photo = 'Please select a photo';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position_id: formData.position_id,
        photo: formData.photo,
      });

      console.log('User registered successfully:', result);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        position_id: positions[0]?.id || 1,
        photo: null,
      });

      // Clear any field errors
      setFieldErrors({});

      // Notify parent component to refresh users list
      if (onUserRegistered) {
        onUserRegistered();
      }
    } catch (error) {
      // Handle API validation errors
      if (error instanceof Error) {
        const errorMessage = error.message;
        const apiErrors: typeof fieldErrors = {};

        // Check for specific conflicts (email/phone already exist)
        if (
          errorMessage.includes(
            'User with this phone or email already exist'
          ) ||
          errorMessage.includes('email already exist') ||
          errorMessage.includes('phone already exist')
        ) {
          // Show error on both email and phone fields for conflicts
          apiErrors.email = 'User with this email or phone already exists';
          apiErrors.phone = 'User with this email or phone already exists';
        } else if (errorMessage.includes('email')) {
          apiErrors.email = errorMessage;
        } else if (errorMessage.includes('phone')) {
          apiErrors.phone = errorMessage;
        } else if (errorMessage.includes('name')) {
          apiErrors.name = errorMessage;
        } else if (errorMessage.includes('photo')) {
          apiErrors.photo = errorMessage;
        } else {
          // Generic validation error
          apiErrors.name = errorMessage;
        }

        setFieldErrors(apiErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.photo &&
    !loading;

  return (
    <section id={id} className="pb-[100px] flex flex-col items-center">
      <div className="flex flex-col items-center gap-[50px] max-w-[412px] w-full px-4">
        <h2 className="text-black-87 font-nunito text-[40px] leading-[40px] font-normal text-center">
          Working with POST request
        </h2>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="space-y-[50px]">
            <Input
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              errorText={fieldErrors.name}
              required
            />

            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              errorText={fieldErrors.email}
              required
            />

            <PhoneInput
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              helperText="+38 (0XX) XXX - XX - XX"
              errorText={fieldErrors.phone}
              required
            />
          </div>

          <div className="mt-[29px]">
            <div className="text-black-87 font-nunito text-base leading-[26px]">
              Select your position
            </div>

            <div className="mt-[11px] space-y-[7px]">
              {positions.map(position => (
                <RadioButton
                  key={position.id}
                  id={position.id.toString()}
                  name="position_id"
                  value={position.id.toString()}
                  checked={formData.position_id === position.id}
                  onChange={handlePositionChange}
                  label={position.name}
                />
              ))}
            </div>
          </div>

          <div className="mt-[47px]">
            <div className="flex">
              <label className="flex w-full">
                <div className="w-[83px] h-[54px] border border-black-87 rounded-l bg-white flex items-center justify-center cursor-pointer">
                  <span className="text-black-87 font-nunito text-base leading-[26px]">
                    Upload
                  </span>
                </div>
                <div className="flex-1 h-[54px] border border-border-gray border-l-0 rounded-r bg-white flex items-center px-4 overflow-hidden">
                  <span
                    className={`font-nunito text-base leading-[26px] truncate block w-full ${formData.photo ? 'text-black-87' : 'text-gray-light'}`}
                    title={formData.photo?.name}
                  >
                    {formData.photo ? formData.photo.name : 'Upload your photo'}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {fieldErrors.photo && (
              <div className="text-red-500 font-nunito text-xs leading-[14px] mt-1">
                {fieldErrors.photo}
              </div>
            )}
          </div>

          <div className="flex justify-center mt-[50px]">
            <Button
              type="submit"
              label="Sign up"
              disabled={!isFormValid}
              variant="primary"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

// Memoize SignUpSection to prevent unnecessary re-renders
export const SignUpSection = memo(SignUpSectionComponent);
