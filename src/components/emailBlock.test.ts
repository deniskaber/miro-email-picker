import { EmailBlock } from './emailBlock';

describe('Email block', () => {
    it('should display valid email block', () => {
        const emailBlock = EmailBlock({
            email: 'some-valid@email.com',
            onRemoveButtonClick: () => {},
        });

        expect(emailBlock.classList.contains('emailBlockInvalid')).toBe(false);
    });

    it('should display invalid email block', () => {
        const emailBlock = EmailBlock({
            email: 'some-invalid.email.com',
            onRemoveButtonClick: () => {},
        });

        expect(emailBlock.classList.contains('emailBlockInvalid')).toBe(true);
    });
});
