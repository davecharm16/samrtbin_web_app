import ChangeEmailForm from '../forms/ChangeEmailForm';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import ChangeEmailSteps from './ChangeEmailSteps';

export default function SettingsTabs() {
    return (
        <div role="tablist" className="tabs tabs-lifted sm:tabs-lg my-4">
            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Email" defaultChecked />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <h2 className="text-2xl font-semibold mb-4">Change Email</h2>
                <div className="flex flex-wrap gap-3">
                    <ChangeEmailForm />
                    <ChangeEmailSteps />
                </div>
            </div>

            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Password" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
                <ChangePasswordForm />
            </div>
        </div>
    );
}
