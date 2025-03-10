// export function notificationActions() {
//     const handleNotificationsToggle = async (enabled: boolean) => {
//         if (session?.user?.email) {
//             // Atualiza o estado local
//             setNotificationsEnabled(enabled);

//             // Salva a preferência no banco de dados
//             await db.user.update({
//                 where: { email: session.user.email },
//                 data: { notificationsEnabled: enabled },
//             });

//             // Registra a ação no log
//             const user = await db.user.findUnique({
//                 where: { email: session.user.email },
//             });

//             if (user) {
//                 await logSettingsUpdated(user);
//             }
//         }
//     }
// }